CandidateReviews = React.createClass({
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
      if(this.data.candidate.reviews) {
        return <div>{
          _.sortBy(this.data.candidate.reviews, function(review) {
            return review.created_at * -1;
          }).map(function (review, index) {
            let user = Meteor.users.findOne(review.user)

            var creationDate = moment(review.created_at * 1000);
            var date = creationDate.fromNow();
            return <article className="media" key={index}>
                <figure className="media-left">
                  <p className="image is-32x32">
                    <img src="/logo.png" />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <a>{user.firstname} {user.lastname}</a>&nbsp;
                      <span className="" dangerouslySetInnerHTML={{ __html: review.message}}></span>
                    </p>
                  </div>
                  <div className="content">
                    <small>{date}</small>
                  </div>
                </div>
              </article>
          })}</div>
      }
      else {
        return <div>Pas de commentaires</div>
      }
    }
  }
})
