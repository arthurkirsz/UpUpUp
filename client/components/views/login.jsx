Login = React.createClass({
  componentDidMount() {
    //TODO: is it the right place ?
    if (Accounts._verifyEmailToken) {
      Accounts.verifyEmail(Accounts._verifyEmailToken, function (err) {
        if (err) {
          // handle the error
        }
      });
    }
  },
  validations() {
    let component = this;

    return {
      rules: {
        emailAddress: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address legit?'
        },
        password: {
          required: 'Need a password here.'
        }
      },
      submitHandler() {
        let { getValue } = ReactHelpers;

        let form     = component.refs.loginForm.refs.form,
            email    = getValue( form, '[name="emailAddress"]' ),
            password = getValue( form, '[name="password"]' );

        Meteor.loginWithPassword( email, password, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          } else {
            FlowRouter.go('/');
          }
        });
      }
    };
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    let passwordLabelLink = {
      href: '/recover-password',
      label: 'Mot de passe oublié ?'
    };

    return <Section>
      <Container fluid={true}>
        <Row>
          <Column size="4">
            <Subtitle size="4">Connexion</Subtitle>
            <div className="notification is-info">
              To access the demo, you can use the email address
              &nbsp;<strong>admin@example.com</strong> and the password <strong>password</strong>.
            </div>
            <Form ref="loginForm" id="login" className="login" validations={ this.validations() } onSubmit={ this.handleSubmit }>
              <FormControl icon="envelope">
                <EmailInput/>
              </FormControl>
              <FormControl icon="lock">
                <input
                  type="password"
                  className="input"
                  ref="password"
                  name="password"
                  placeholder="Mot de passe"/>
                <a className="help is-info" href="/recover-password">Mot de passe oublié ?</a>
              </FormControl>
              <FormGroup>
                <Button type="submit" style="primary">Se connecter</Button>
              </FormGroup>
              <p>Pas de compte ? <a href="/signup">Créer un compte</a>.</p>
            </Form>
          </Column>
        </Row>
      </Container>
    </Section>
  }
});
