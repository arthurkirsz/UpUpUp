CandidateForm = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let data = {}
    if (!_.isEmpty(this.props.id)) {
      let subscribed = Meteor.subscribe('candidates');
      let subscribedTags = Meteor.subscribe('tags');
      if (subscribed.ready() && subscribedTags.ready()) {
        data.candidate = Candidates.findOne({_id: this.props.id});
        data.tags = Tags.find().fetch();
        data.isReady = subscribed.ready() && subscribedTags.ready();
      }
    }
    else {
      data.isReady = true;
    }
    return data;
  },
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var firstname = ReactDOM.findDOMNode(this.refs.firstname).value.trim();
    var lastname = ReactDOM.findDOMNode(this.refs.lastname).value.trim();
    var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    var phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
    var linkedin = ReactDOM.findDOMNode(this.refs.linkedin).value.trim();

    if (this.props.id) {
      Meteor.call('updateCandidate', this.props.id, firstname, lastname, email, phone, linkedin, Meteor.user().company, function (error, applicantId) {
        if (error) {
          Bert.alert( error.message, 'danger', 'growl-top-right' );
        }
        else if (applicantId) {
          Bert.alert( "Candidat modifié", 'success', 'growl-top-right' );
        }
      });
    }
    else {
      Meteor.call('insertCandidate', firstname, lastname, email, phone, Meteor.user().company, function (error, candidateId) {
        if (error) {
          Bert.alert( error.message, 'danger', 'growl-top-right' );
        }
        else if (candidateId) {
          FlowRouter.go(FlowRouter.path("candidateDetail", {id: candidateId}, {}));
        }
      });
    }
  },
  handleClientLoad(data, textStatus) {
    let that = this
    var tagsNames = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: this.data.tags
    });
    tagsNames.initialize();

    $('#tags').tagsinput({
      tagClass: "tag label label-info is-info",
      typeaheadjs: {
        name: 'tagsNames',
        displayKey: 'name',
        valueKey: 'name',
        source: tagsNames.ttAdapter()
      }
    });
    let candidateTagsIds = _.filter(this.data.tags, function(element) {
      return _.contains(that.data.candidate.tags, element._id);
    })

    _.forEach(candidateTagsIds, function(element) {
      $('#tags').tagsinput('add', element.name, {preventPost: true});
    })

    $('#tags').on('itemRemoved', function(event) {
      if (!event.options || !event.options.preventPost) {
        Meteor.call("removeTagFromCandidate", event.item, that.props.id, Meteor.user().company, function (error) {
          if (error) {
            Bert.alert( error.message, 'danger', 'growl-top-right' );
          }
          else {
            Bert.alert( event.item + " a été retiré", 'info', 'growl-top-right' );
          }
        })
      }
    });
    $('#tags').on('itemAdded', function(event) {
      if (!event.options || !event.options.preventPost) {
        Meteor.call("addTagToCandidate", event.item, that.props.id, Meteor.user().company, function (error) {
          if (error) {
            Bert.alert( error.message, 'danger', 'growl-top-right' );
          }
          else {
            Bert.alert( event.item + " a été ajouté", 'info', 'growl-top-right' );
          }
        })
      }
    });
  },
  componentDidMount: function() {
    if (this.props.id) {
      $.getScript("https://twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js", this.handleClientLoad);
    }
  },
  handlePictureChange(event) {
    event.preventDefault()
    var uploader = new Slingshot.Upload("picturesUploads");
    let that = this
    uploader.send(ReactDOM.findDOMNode(this.refs.picture).files[0], function (error, downloadUrl) {
      if (error) {
        Bert.alert( error.message, 'danger', 'growl-top-right' );
      }
      else {
        Meteor.call("changePicture", that.props.id, downloadUrl, function (error) {
          if (error) {
            Bert.alert( error.message, 'danger', 'growl-top-right' );
          }
        })
      }
    });
  },
  handleDocChange() {
    var uploader = new Slingshot.Upload("docsUploads");
    let that = this;
    uploader.send(ReactDOM.findDOMNode(this.refs.docs).files[0], function (error, downloadUrl) {
      if (error) {
        Bert.alert( error.message, 'danger', 'growl-top-right' );
      }
      else {
        Meteor.call("addDocs", that.props.id, downloadUrl, function (error) {
          if (error) {
            Bert.alert( error.message, 'danger', 'growl-top-right' );
          }
        })
      }
    });
  },
  handleEducation(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      var education = ReactDOM.findDOMNode(this.refs.education).value.trim();
      ReactDOM.findDOMNode(this.refs.education).value = ""
      Meteor.call("addEducation", this.props.id, education)
    }
  },
  handleJob(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      var job = ReactDOM.findDOMNode(this.refs.job).value.trim();
      ReactDOM.findDOMNode(this.refs.job).value = ""
      Meteor.call("addJob", this.props.id, job)
    }
  },
  getContent() {
    let updateFields;
    let pictureField;
    if(this.props.id) {
      pictureField = <div className="form-group">
        <label htmlFor="picture">Photo</label>
        <input type="file" ref="picture" id="picture" onChange={this.handlePictureChange} />
        <img src={_.isEmpty(this.props.id) ? "" : this.data.candidate.picture } height="170.07874" width="132.283465"/>
      </div>
      updateFields = <div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input type="text" className="form-control" ref="tags" id="tags" name="tags"  data-role="tagsinput"/>
        </div>
      </div>
    }
    return <Section>
      <Container fluid={true}>
        <Subtitle size="3">
          {_.isEmpty(this.props.id) ? "Créer un candidat" : this.data.candidate.firstname }
        </Subtitle>
        <form onSubmit={this.handleSubmit}>
          {pictureField}
          <div className="form-group">
            <label htmlFor="lastname">Nom</label>
            <input type="text" className="form-control" ref="lastname" name="lastname" id="lastname" defaultValue={_.isEmpty(this.props.id) ? "" : this.data.candidate.lastname }/>
          </div>
          <div className="form-group">
            <label htmlFor="firstname">Prénom</label>
            <input type="text" className="form-control" ref="firstname" name="firstname" id="firstname"  defaultValue={_.isEmpty(this.props.id) ? "" : this.data.candidate.firstname }/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" ref="email" id="email" name="email"  defaultValue={_.isEmpty(this.props.id) ? "" : this.data.candidate.email }/>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Téléphone</label>
            <input type="tel" className="form-control" ref="phone" id="phone" name="phone"  defaultValue={_.isEmpty(this.props.id) ? "" : this.data.candidate.phone }/>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Linkedin</label>
            <input type="text" className="form-control" ref="linkedin" id="linkedin" name="linkedin"  defaultValue={_.isEmpty(this.props.id) ? "" : this.data.candidate.linkedin }/>
          </div>
          {updateFields}
          <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
      </Container>
    </Section>
  },
  render() {
    return <div>{this.data.isReady ? this.getContent(): <div>Loading ...</div> }</div>
  }
})
