Separator = React.createClass({
  render() {
    return <div>
      <Row>
        <Column size="auto">
          <hr/>
        </Column>
        <Column size="auto">
          <div className="text-center" style={{lineHeight:"40px"}}>
            { this.props.label }
          </div>
        </Column>
        <Column size="auto">
          <hr/>
        </Column>
      </Row>
    </div>

  }
});
