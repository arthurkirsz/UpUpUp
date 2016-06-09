CandidateDetail = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    var handleCandidates = Meteor.subscribe( 'candidates' );
    var handleTags = Meteor.subscribe( 'tags' );
    var handleStages = Meteor.subscribe( 'stages' );

    return {
      isLoading: !handleCandidates.ready() || !handleTags.ready() || !handleStages.ready(),
      candidate: Candidates.findOne({_id: this.props.id}),
      stages: Stages.find().fetch(),
      tags: Tags.find().fetch().map( ( tag ) => {
        return { uid: tag._id, label: tag.name };
      })
    };
  },
  handleContact(event) {
    event.preventDefault()

    var message = $('.editable').html()//ReactDOM.findDOMNode(this.refs.message).value.trim();
    Meteor.call("contactCandidate", this.props.id, Meteor.userId(), message, function(error) {
      if (error) {
        Bert.alert( error.reason, 'danger' );
      }
      else {
        // TODO : scroll container messages to the last message
      }
    })
  },
  handleSubmit(event) {
    event.preventDefault()
    var inputDomElement = ReactDOM.findDOMNode(this.refs.message);
    var message = inputDomElement.value.trim();
    Meteor.call("reviewCandidate", this.props.id, Meteor.userId(), message, function(error) {
      if (error) {
        Bert.alert( error.reason, 'danger' );
      }
      else {
        inputDomElement.value = "";
      }
    })
  },
  formatDate(value){
    var creationDate = moment(value * 1000);
    return creationDate.fromNow();
  },
  updateDate(date) {
    this.data.date = date;
  },
  handleSubmitReminder() {
    let remindertext = ReactDOM.findDOMNode(this.refs.remindertext).value.trim()
    let date = this.data.date.toDate().getTime();
    let candidateId = this.props.id
    let userId = Meteor.userId();
    let isEmail = this.data.isEmail || false
    let reminderType = (isEmail ? ReminderTypes.EMAIL : ReminderTypes.NOTIFICATION)
    that = this;
    if (reminderType == ReminderTypes.NOTIFICATION) {
      if (!("Notification" in window)) {
        alert("Ce navigateur ne supporte pas les notifications desktop");
      }

      else if (Notification.permission === "granted") {
        Meteor.call('insertReminder', remindertext, date, candidateId, userId, reminderType, function(error, response) {
          if (error) {
            Bert.alert( error.reason, 'danger' );
          }
          else {
            ReactDOM.findDOMNode(that.refs.remindertext).value = ""
            Bert.alert( "Rappel bien ajouté.", 'success' , 'growl-top-right');
          }
        })
      }
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if(!('permission' in Notification)) {
            Notification.permission = permission;
          }
          if (permission === "granted") {
            that.handleSubmitReminder()
          }
        });
      }
    }
  },
  onEmailChecked(event) {
    this.data.isEmail = event.target.checked;
  },

  render() {
    if(this.data.isLoading) {
      return <Loading/>
    }
    else {
      let fullname = this.data.candidate.firstname + ' ' + this.data.candidate.lastname
      let params = this.props;

      var tags = this.data.tags;
      var candidateTags = [];
      _.each(this.data.candidate.tags, function (tagId, i) {
        var tag = _.find(tags, function(tag,i){
          return tag.uid == tagId;
        });
        if(typeof tag !== 'undefined')
          candidateTags.push(tag.label);
      });
      var stageToFind = this.data.candidate.stage;
      var stageName = _.find(this.data.stages, function(stage,i){
        return stageToFind == stage.order;
      });

      return <div className="">
        <section>
          <div className="columns" style={{margin: "0px"}}>
            <div className="is-hidden-tablet" style={{background: "#FBFBFB", padding: "15px 10px", borderBottom: "1px solid #ddd"}}>
              <Container fluid={true}>
                <Subtitle size="4">{ fullname }</Subtitle>
              </Container>
            </div>
            <div className="column is-5 is-hidden-mobile" style={{height: "calc(100vh - 50px)",overflow: "scroll",background: "#FBFBFB",padding: "50px 0",borderRight:" 1px solid #ddd"}}>
              <CandidateProfile tags={this.data.tags} stages={this.data.stages} candidate={this.data.candidate}/>
            </div>
            <div className="column is-7" style={{height: "calc(100vh - 50px)",overflow: "scroll",background: "#FFF",padding: "0"}}>
              <div className="tabs is-centered detail">
                <ul>
                  <li className="active">
                    <a href="#activity" data-toggle="tab">
                      <i className="fa fa-history"></i>
                      <br/>
                      <span>Activité</span>
                    </a>
                  </li>
                  <li>
                    <a href="#comments" data-toggle="tab">
                      <i className="fa fa-comments"></i>
                      <br/>
                      <span>Commentaires</span>
                    </a>
                  </li>
                  <li>
                    <a href="#mail" data-toggle="tab">
                      <i className="fa fa-envelope-o"></i>
                      <br/>
                      <span>Emails</span>
                    </a>
                  </li>
                  <li>
                    <a href="#grade" data-toggle="tab">
                      <i className="fa fa-thumbs-up"></i>
                      <br/>
                      <span>Feedback</span>
                    </a>
                  </li>
                  <li>
                    <a href="#reminders" data-toggle="tab">
                      <i className="fa fa-sticky-note-o"></i>
                      <br/>
                      RAPPELS
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="activity">
                  <Container fluid={true}>
                    {this.data.candidate.disqualified ? <div className="notification is-danger">candidat disqualifié</div> : null}
                    <CandidateFeedbacks stages={this.data.stages} candidate={this.data.candidate}/>
                    <br/>
                    <br/>
                    <div className="notification is-info">
                      Création du candidat ({this.formatDate(this.data.candidate.created_at)})
                    </div>
                    <br/>
                    <br/>
                  </Container>
                </div>

              <div role="tabpanel" className="tab-pane" id="comments">
                <Section>
                  <Container fluid={true}>
                    Vos notes sur {this.data.candidate.firstname}
                    <p className="control has-addons">
                      <input ref="message" className="input" type="text" placeholder="Laisser une note..." />
                      <a className="button is-info" onClick={this.handleSubmit} >
                        Envoyer
                      </a>
                    </p>
                    <CandidateReviews id={this.data.candidate._id}></CandidateReviews>
                  </Container>
                </Section>
              </div>

                <div role="tabpanel" className="tab-pane" id="mail">
                  <Section>
                    <Container fluid={true}>
                      <Row>
                        <Column size="10">
                          <div className="notification is-danger">
                            <button className="delete"></button>
                            Fonctionnalité expérimentale d'envoi/récéption d'email in-app.
                            Ne pas utiliser pour le moment : en cours de test/validation.

                          </div>
                          <div className="panel panel-white">
                            <div className="panel-heading clearfix">
                              <h4 className="panel-title">Conversation avec { this.data.candidate.firstname}</h4>
                            </div>
                            <div className="panel-body" style={{background: "#f0f4f7", overflowY: "auto", padding: "15px", height: "340px",borderTop: "1px solid #c9d7df",borderBottom: "1px solid #c9d7df"}}>
                              <CandidateConversation id={this.data.candidate._id}/>
                            </div>

                            <MarkdownEditor
                              ref="content"
                              placeholder="Commencer la saisie..." />
                            <p className="clearfix">
                              <button className="btn btn-success pull-right" onClick={this.handleContact} style={{margin: "0px 10px"}}>Répondre</button>
                            </p>
                          </div>
                        </Column>
                      </Row>
                    </Container>
                  </Section>
                </div>
                <div role="tabpanel" className="tab-pane" id="grade">
                  <CandidateFeedbackForm candidate={this.data.candidate}/>
                </div>
                <div role="tabpanel" className="tab-pane" id="reminders">
                  <Section>
                    <Container fluid={true}>
                      <Row>
                        <article className="message">
                          <div className="message-body">
                            Petit rappel: Les notifications ne peuvent pas être entièrement fiables. Pensez à choisir l'option mail pour les notifications importantes
                          </div>
                        </article>
                      </Row>
                      <Row>
                        <Column size="8">
                          <p className="control">
                            <textarea className="textarea" placeholder="Rappel moi de ..." ref="remindertext"></textarea>
                          </p>
                        </Column>
                        <Column size="4">
                          <p className="control">
                            <label className="checkbox">
                              <input type="checkbox" ref="reminderemail" onChange={this.onEmailChecked} />
                                Email ?
                            </label>
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column size="8">
                          <div className="control has-icon has-addons">
                            <ReactDatetimePicker configuration='configurationName' inputProps={{className:'input is-4'}} onChange={this.updateDate}/>
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                            <a className="button is-info" onClick={this.handleSubmitReminder} >
                              Envoyer
                            </a>
                          </div>
                        </Column>
                      </Row>
                    </Container>
                  </Section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      }
    }
});
