CandidateProfile = React.createClass({
  updateStage() {
    var stage = ReactDOM.findDOMNode(this.refs.stage).value;
    Meteor.call("updateStage", this.props.candidate._id, stage, function(error) {
      if (error) {
        Bert.alert( error.reason, 'danger' );
      }
      else {
        // TODO : scroll container messages to the last message
      }
    })
  },
  disqualify(){
    if(confirm('Êtes vous sur de vouloir disqualifier ce candidat ?')){
      Meteor.call("disqualify", this.props.candidate._id, function(error) {
        if (error) {
          Bert.alert( error.reason, 'danger' );
        }
        else {
        }
      })
    }
  },
  undisqualify(){
    Meteor.call("undisqualify", this.props.candidate._id, function(error) {
      if (error) {
        Bert.alert( error.reason, 'danger' );
      }
      else {}
    })
  },
  handleDocChange() {
    var uploader = new Slingshot.Upload("docsUploads");
    let that = this;
    uploader.send(ReactDOM.findDOMNode(this.refs.docs).files[0], function (error, downloadUrl) {
      if (error) {
        Bert.alert( error.message, 'danger', 'growl-top-right' );
      }
      else {
        Meteor.call("addDocs", that.props.candidate._id, downloadUrl, function (error) {
          if (error) {
            Bert.alert( error.message, 'danger', 'growl-top-right' );
          }
        })
      }
    });
  },
  handleDeleteCandidate(){
    if(confirm('Action irréversible. Continuer ?')) {
      Meteor.call( 'deleteCandidate', this.props.candidate._id, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( 'Candidat supprimé !', 'success' );
          FlowRouter.go('/candidates')
        }
      });
    }
  },
  goToEdit(){
    FlowRouter.go(FlowRouter.path("candidatesEdit", {id: this.props.candidate._id}, {}));
  },
  renderStageForm(){
    if(this.props.candidate.disqualified) {
      return <Row>
        <Column size="1">
          <i className="fa fa-briefcase"></i>
        </Column>
        <Column size="auto">
          Ce candidat a été disqualifié <a onClick={this.undisqualify}>annuler</a>
        </Column>
      </Row>
    }
    else {
      return <Row>
        <Column size="1">
          <i className="fa fa-briefcase"></i>
        </Column>
        <Column size="auto">
          <p className="control">
            <span className="select">
              <select ref="stage" defaultValue={this.props.candidate.stage} onChange={this.updateStage}>
                {this.props.stages.map( function (stage) {
                  return <option key={stage.order} value={stage.order}>{stage.label}</option>
                })}
              </select>
            </span>
          </p>
        </Column>
        <Column size="auto">
          <button className="button is-danger" onClick={this.disqualify}>
            Disqualifier
            <span className="icon">
              <i className="fa fa-hand-paper-o"></i>
            </span>
          </button>
        </Column>
      </Row>
    }
  },
  render() {

    let fullname = this.props.candidate.firstname + ' ' + this.props.candidate.lastname
    let params = this.props;

    var tags = this.props.tags;
    var candidateTags = [];
    _.each(this.props.candidate.tags, function (tagId, i) {
      var tag = _.find(tags, function(tag,i){
        return tag.uid == tagId;
      });
      if(typeof tag !== 'undefined')
        candidateTags.push(tag.label);
    });
    var stageToFind = this.props.candidate.stage;
    var stageName = _.find(this.props.stages, function(stage,i){
      return stageToFind == stage.order;
    });



    return <Container fluid={true}>
          <Subtitle size="3">{ fullname }</Subtitle>

            <p className="control is-grouped">
              <Button style="primary" size="small" outlined={true} onClick={ this.goToEdit }>
                modifier
              </Button>
              <Button style="danger" size="small" outlined={true} onClick={ this.handleDeleteCandidate }>
                supprimer
              </Button>
            </p>

            <ul>
              <li>
                Linkedin: <a href={this.props.candidate.linkedin} target="_blank">
                  { this.props.candidate.linkedin }
                </a>
              </li>
              <li>
                mail: <a href={ `mailto:${this.props.candidate.email }` } target="_blank">
                  { this.props.candidate.email }
                </a>
              </li>
              <li>
                téléphone: <a href={ `phone:${this.props.candidate.phone }` }>
                  { this.props.candidate.phone }
                </a>
              </li>
              <li>
                Tags:
                {candidateTags.map( function (tag) {
                  return <span key={tag} className="tag is-info" style={{marginRight: "5px"}}>{tag}</span>
                })}
              </li>
              <li>
                <hr/>
                <div className="content">
                  <ul>{this.props.candidate.documents.map(function(doc) {
                    return <li key={doc}><a href={doc} target="_blank">{doc.split('/').pop()}</a></li>
                  })}</ul>
                </div>
                <label htmlFor="docs" className=" button is-info">
                  <span className="icon">
                    <i className="fa ion-paperclip"></i>
                  </span>
                  Ajouter un CV ou un document
                </label>
                <input
                  type="file"
                  ref="docs"
                  id="docs"
                  multiple="true"
                  onChange={this.handleDocChange}
                  className="inputfile"/>
                <hr/>
              </li>
              <li>
                { this.renderStageForm() }
                <hr/>
              </li>
            </ul>

            <div className="card" style={{display:"none"}}>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-5">Formation</p>
                  </div>
                </div>
                <div className="content">
                  <ul>{this.props.candidate.education.map(function(education) {
                    return <li key={education}>{education}</li>
                  })}</ul>
                </div>
              </div>
            </div>
            <div className="card" style={{display:"none"}}>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-5">Expérience</p>
                  </div>
                </div>
                <div className="content">
                  <ul>{_.isEmpty(this.props.candidate._id) ? "" : this.props.candidate.jobs.map(function(job) {
                    return <li key={job}>{job}</li>
                  })}</ul>
                </div>
              </div>
            </div>
    </Container>
  }
})
