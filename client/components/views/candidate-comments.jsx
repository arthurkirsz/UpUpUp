CandidateConversation = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    var handleCandidates = Meteor.subscribe( 'candidates' );
    var handleUsers = Meteor.subscribe( 'companyUsers' );

    return {
      isLoading: !handleCandidates.ready() || !handleUsers.ready(),
      candidate: Candidates.findOne({_id: this.props.id})
    };
  },
  render() {
    if(this.data.isLoading) {
      return <Loading/>
    }
    else {
      if(this.data.candidate.conversation) {
        return <div>{_.sortBy(this.data.candidate.conversation.messages, ['created_at']).map(function (conv, index) {
          let user
          if (conv.user)
            user = Meteor.users.findOne(conv.user).firstname + " " + Meteor.users.findOne(conv.user).lastname
          else
            user = conv.email

          var creationDate = moment(conv.created_at * 1000);
          var date = creationDate.fromNow();
          return <div key={index}>
            <strong>{user}</strong> <small>{date}</small>
            <div className="bubble" dangerouslySetInnerHTML={{ __html: conv.message}}></div>
          </div>
        })}</div>
      }
      else {
        return <div>Début des commentaires</div>
      }
    }
  }
})