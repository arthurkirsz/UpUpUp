NotFound = React.createClass({
  render() {
    return <Section>
      <Container>
        <div className="notification is-danger">
          <strong>Erreur [404]</strong>: { FlowRouter.current().path } n'existe pas.
        </div>
      </Container>
    </Section>;
  }
});
