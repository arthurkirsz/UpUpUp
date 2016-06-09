ResetPassword = React.createClass({
  validations() {
    let component = this;

    return {
      rules: {
        password: {
          required: true,
          minlength: 6
        },
        repeatPassword: {
          required: true,
          minlength: 6,
          equalTo: '[name="password"]'
        }
      },
      messages: {
        password: {
          required: "Enter a new password, please.",
          minlength: "Use at least six characters, please."
        },
        repeatPassword: {
          required: "Repeat your new password, please.",
          equalTo: "Hmm, your passwords don't match. Try again?"
        }
      },
      submitHandler() {
        let { getValue } = ReactHelpers;

        let form     = component.refs.resetPasswordForm.refs.form,
            token    = component.props.token,
            password = getValue( form, '[name="password"]' );

        Accounts.resetPassword( token, password, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          } else {
            Bert.alert( 'Password reset!', 'success' );
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
            <div className="notification is-info">
              To reset your password, enter a new one below. You will be logged in with your new password.
            </div>
            <Form ref="resetPasswordForm" id="reset-password" className="reset-password" validations={ this.validations() } onSubmit={ this.handleSubmit }>
              <FormControl icon="lock">
                <input
                  type="password"
                  className="input"
                  ref="password"
                  name="password"
                  placeholder="Mot de passe"/>
              </FormControl>
              <FormControl icon="lock">
                <input
                  type="password"
                  className="input"
                  ref="repeatPassword"
                  name="repeatPassword"
                  placeholder="Retaper le mot de passe"/>
              </FormControl>
              <Button style="success" type="submit">
                Réinitialiser le mot de passe &amp; se connecter
              </Button>
            </Form>
          </Column>
        </Row>
      </Container>
    </Section>
  }
});
