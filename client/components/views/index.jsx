Index = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    var handleCandidates = Meteor.subscribe( 'candidates' );

    return {
      isLoading: !handleCandidates.ready(),
      candidates: Candidates.find().fetch()
    };
  },
  render() {
    if(this.data.isLoading){
      return <Loading/>
    }
    else {
      return <Section>
          <Container fluid={true}>
            <div className="columns">
              <div className="column">
                <div className="columns is-multiline">
                    <a href="/candidates" className="column is-6">
                      <div className="panel info-box panel-white">
                        <div className="panel-body">
                          <div className="info-box-stats">
                            <p className="counter">{this.data.candidates.length}</p>
                            <span className="info-box-title">Candidats actifs</span>
                          </div>
                          <div className="info-box-icon">
                            <i className="ion-person"></i>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a href="/candidates" className="column is-6">
                      <div className="panel info-box panel-white">
                        <div className="panel-body">
                          <div className="info-box-stats">
                            <p className="counter">5</p>
                            <span className="info-box-title">Taches en attente</span>
                          </div>
                          <div className="info-box-icon">
                            <i className="ion-ios-list-outline"></i>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a href="/candidates" className="column is-6">
                      <div className="panel info-box panel-white">
                        <div className="panel-body">
                          <div className="info-box-stats">
                            <p className="counter">-</p>
                            <span className="info-box-title">Comming soon</span>
                          </div>
                          <div className="info-box-icon">
                            <i className="ion-ios-clock-outline"></i>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a href="/candidates" className="column is-6">
                      <div className="panel info-box panel-white">
                        <div className="panel-body">
                          <div className="info-box-stats">
                            <p className="counter">-</p>
                            <span className="info-box-title">Comming soon</span>
                          </div>
                          <div className="info-box-icon">
                            <i className="ion-ios-clock-outline"></i>
                          </div>
                        </div>
                      </div>
                    </a>

                </div>
              </div>
              <div className="column is-quarter">
                <div className="panel panel-white">
                  <div className="panel-body">
                    <h4 style={{textAlign:"center",fontWeight:"300", fontSize:"18px", marginTop:"0"}}>
                      Parlez d'UpUpUp
                    </h4>
                    <br/>
                    <p style={{fontWeight:"300"}}>
                      Nous travaillons d'arrache pied pour ajouter de nouvelles
                      fonctionnalités à UpUpUp et rendre le service encore plus efficace.
                      Aidez nous à faire connaitre UpUpUp !
                    </p>
                    <br/>
                    <p style={{textAlign:"center"}}>
                      <Button href="https://twitter.com/upupup_app" style="primary">
                        Share the love
                      </Button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>;
    }
  }
});
