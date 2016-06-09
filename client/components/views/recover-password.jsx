RecoverPassword = React.createClass({
  validations() {
    let component = this;

    return {
      rules: {
        emailAddress: {
          required: true,
          email: true
        }
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address legit?'
        }
      },
      submitHandler() {
        let { getValue } = ReactHelpers;

        let form  = component.refs.recoverPasswordForm.refs.form,
            email = getValue( form, '[name="emailAddress"]' );

        Accounts.forgotPassword( { email: email }, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'warning' );
          } else {
            Bert.alert( 'Check your inbox for a reset link!', 'success' );
          }
        });
      }
    };
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    return <Section>
      <Container fluid={true}>
        <Row>
          <Column size="4">
            <Subtitle size="4">Réinitialiser le mot de passe</Subtitle>
            <div className="notification is-info">
              Entrez votre adresse email ci-dessous pour recevoir un lien pour réinitialiser votre mot de passe.
            </div>
            <Form ref="recoverPasswordForm" id="recover-password" validations={ this.validations() } className="recover-password" onSubmit={ this.handleSubmit }>
              <FormControl icon="envelope">
                <EmailInput/>
              </FormControl>
              <FormControl>
                <Button type="submit" style="primary">Réinitialiser le mot de passe</Button>
              </FormControl>
            </Form>
          </Column>
        </Row>
      </Container>
    </Section>
  }
});
