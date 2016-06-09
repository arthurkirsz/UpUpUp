CandidatesList = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    var handleCandidates = Meteor.subscribe( 'candidates' );
    var handleTags = Meteor.subscribe( 'tags' );
    var handleStages = Meteor.subscribe( 'stages' );

    var stageParam = FlowRouter.getQueryParam("stage");
    var tagParam = FlowRouter.getQueryParam("tag");
    var query =  {};
    if(stageParam) {
      query.stage = parseInt(stageParam);
    }
    if(tagParam) {
      query.tags = { $in: [tagParam] };
    }

    return {
      isLoading: !handleCandidates.ready() || !handleTags.ready() || !handleStages.ready(),
      stages: Stages.find().fetch(),
      candidates: Candidates.find(query).fetch(),
      tags: Tags.find().fetch().map( ( tag ) => {
        return { uid: tag._id, label: tag.name };
      })
    };
  },
  render() {
    if(this.data.isLoading){
      return <Loading/>
    }
    else {
      return <Section>
        <Container fluid={true}>
          <Row mobile={true}>
            <Column size="auto">
              <Subtitle size="3">Candidats ({this.data.candidates.length})</Subtitle>
            </Column>
            <Column size="quarter">
              <Button href={FlowHelpers.pathFor('candidatesCreate')}
                      style="primary is-pulled-right">
                      Nouveau Candidat
              </Button>
            </Column>
          </Row>
          <Row>
            <GridColumn className="col-md-12">
              <p>Trier par tags:&nbsp;
                {this.data.tags.map( ( tag ) => {
                  return <li>
                    <a href={FlowRouter.path("/candidates", null, {tag: tag.uid})}>
                      {tag.label}
                    </a>
                  </li>
                })}
              </p>
              <br/>
            </GridColumn>
          </Row>

          <div className="tabs is-centered is-toggle">
            <ul>
              <li><a href={FlowRouter.path("/candidates", null, {stage: ""})}>All</a></li>
              {this.data.stages.map( ( stage ) => {
                return <li>
                  <a href={FlowRouter.path("/candidates", null, {stage: stage.order})}>
                    {stage.label}
                  </a>
                </li>
              })}
            </ul>
          </div>

          <Row>
            <Column size="auto">
              <div className="panel panel-white">
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table is-narrow">
                      <thead>
                        <tr>
                          <th width="80">
                            &nbsp;</th>
                          <th>
                            <span>Name</span>
                          </th>
                          <th width="105">
                            <span>Actions</span>
                          </th>
                          <th align="right">
                            <span>statut</span>
                          </th>
                          <th width="90">
                            <span>Score</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.data.candidates.map( ( candidate ) => {
                          return <Candidate key={candidate._id} candidate={candidate} tags={this.data.tags} stages={this.data.stages} />
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Column>
          </Row>
        </Container>
      </Section>
    }
  }
});

Candidate = React.createClass({
  goToDetail(){
    FlowRouter.go(`/candidates/${ this.props.candidate._id }`);
  },
  renderDisqualfied(){
    if(this.props.candidate.disqualified) {
      return <span className="tag is-danger" style={{marginRight: "5px"}}>
        Disqualifié
      </span>
    }
    else {
      return null
    }

  },
  render(){
    var tags = this.props.tags;
    var candidateTags = [];
    _.each(this.props.candidate.tags, function (tagId, i) {
      var tag = _.find(tags, function(tag,i){
        return tag.uid == tagId;
      });
      if(typeof tag !== 'undefined')
        candidateTags.push(tag.label);
    });

    var karmaArray = _.pluck(this.props.candidate.feedback, 'karma');
    var score = _.reduce(karmaArray, function(memo, num){ return memo + num; }, 0);

    var stageToFind = this.props.candidate.stage;
    var stageName = _.find(this.props.stages, function(stage,i){
      return stageToFind == stage.order;
    });

    return <tr style={{cursor:"pointer"}}>
      <td>
        <p className="control">
          <input type="checkbox" />
        </p>
      </td>
      <td className="table-link" onClick={ this.goToDetail } style={{verticalAlign: "middle"}}>
        <span>
          {this.props.candidate.firstname} {this.props.candidate.lastname}
        </span>
      </td>
      <td></td>
      <td>
        <div className="is-pulled-right">
          {this.renderDisqualfied()}
          <span className="tag is-success" style={{marginRight: "5px"}}>
            {stageName.label}
          </span>
          {candidateTags.map( ( tag ) => {
            return <span className="tag is-info" style={{marginRight: "5px"}}>{tag}</span>
          })}
        </div>
      </td>
      <td>{score}</td>
    </tr>
  }
})
