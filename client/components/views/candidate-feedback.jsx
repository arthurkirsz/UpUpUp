CandidateFeedbackForm = React.createClass({
  componentDidMount(){
    $('#choices li').on('click', function(){
      $('#choices li').removeClass('is-active');
      $(this).addClass('is-active');
    })
  },
  getInitialState: function() {
    return { showReason: false };
  },
  handleSort(value) {
    this.setState({ showReason: true });
    this.setState({ karma: value });
  },
  sendFeedback() {
    var that = this;
    var reasonsDom = ReactDOM.findDOMNode(this.refs.reason);
    var reasons = $($(reasonsDom)[0]).html();
    var karma = this.state.karma;

    Meteor.call("scoreCandidate", this.props.candidate._id, Meteor.userId(), reasons, karma, function(error) {
      if (error) {
        Bert.alert( error.reason, 'danger' );
      }
      else {
        Bert.alert( "Feedback envoyé", 'success' );
        that.setState({ showReason: false })
        that.setState({ karma: null })
      }
    })
  },
  renderChoices() {
    return <div id="choices" className="tabs is-toggle is-fullwidth">
      <ul>
        <li>
          <a onClick={this.handleSort.bind(this, 3)}>
            <i className="fa fa-star"></i> Absolument
          </a>
        </li>
        <li>
          <a onClick={this.handleSort.bind(this, 2)}>
            <i className="fa fa-thumbs-up"></i> Oui
          </a>
        </li>
        <li>
          <a onClick={this.handleSort.bind(this, 1)}>
            <i className="fa fa-thumbs-down"></i> Non
          </a>
        </li>
      </ul>
    </div>
  },
  render() {
    var alreadyScored = false;
    let currentStage = this.props.candidate.stage;
    let currentUser = Meteor.userId();

    _.each(this.props.candidate.feedback, function (feedback, i) {
      if(feedback.stage == currentStage && feedback.user == currentUser)
        alreadyScored = true;
    });

    if(!alreadyScored) {
      return <div className="container is-fluid" style={{padding:"0px", margin: "0px"}}>
          <div className="notification" style={{display: "none"}}>
            <button className="delete"></button>
              Choisissez entre les trois options pour décider si
              le candidat doit parvenir à l'étape suivante du recrutement.
              Un commentaire est nécéssaire pour soumettre l'évaluation.
              Il permettra à vos collègues d'avoir un point de référence.
          </div>
          <div style={{margin: "20px"}}>
            <p className="menu-label">
                Ce candidat devrait-il aller a l'étape suivante ?
            </p>
            { this.renderChoices() }

            { this.state.showReason ? <div>
              <div style={{border: "1px solid #aaa"}} className="content">
                <MarkdownEditor ref="reason" placeholder="Expliquez votre choix en quelques mots..." />
              </div>
              <button className="button is-info" onClick={this.sendFeedback}>
                Enregistrer votre évaluation
              </button>
            </div> : null }
          </div>
      </div>
    }
    else {
      return <Container fluid={true}>
        <div className="notification is-info">
          Vous avez déjà voté pour ce candidat à cette étape.
          Retrouvez l'ensemble des évaluations de ce candidat
          dans l'onglet <strong>activité</strong>
        </div>
      </Container>
    }
  }
});

CandidateFeedbacks = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    var handle = Meteor.subscribe( 'companyUsers' );

    return {
      isLoading: !handle.ready(),
      users: Meteor.users.find().fetch()
    };
  },
  getKarmaIcon(karma){
    let icons = {
      1: <i className="fa fa-thumbs-down"></i>,
      2: <i className="fa fa-thumbs-up"></i>,
      3: <i className="fa fa-star"></i>
    };
    return icons[ karma ];
  },
  formatDate(value){
    var creationDate = moment(value * 1000);
    return creationDate.fromNow();
  },
  render() {
    var that = this;
    var stages = _.sortBy(this.props.stages, function(stage){
      return -stage.order
    });

    _.each(stages, function (stage, i) {
      stage.feedback = _.filter(that.props.candidate.feedback, function (feedback, i) {
        return feedback.stage == stage.order
      }) || [];
    });

    return <div>
      {stages.map(function (stage) {
        if(stage.feedback.length) {
          return <div>
            <Separator label={stage.label} />
            {stage.feedback.map( function (f) {
              let user = _.find(that.data.users, function(user, i){
                return user._id == f.user
              });
              return <article className="media box">
                <figure className="media-left">
                  <p className="image is-64x64 icon is-medium">
                    {that.getKarmaIcon(f.karma)}
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{user.firstname} {user.lastname}</strong>
                      &nbsp;<small>{that.formatDate(f.created_at)}</small>
                      <br/>
                      <div dangerouslySetInnerHTML={{ __html: f.message}}></div>
                    </p>
                  </div>
                </div>
              </article>
            })}
          </div>
        }
      })}
    </div>
  }
})


// <h3 style={{padding: "10px", textAlign: "center", color: "#333", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", marginBottom: "10px", fontWeight: "bold"}}>
//   {stage.label}
// </h3>
