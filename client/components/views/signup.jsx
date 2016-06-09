Signup = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let data = {}
    let subscribed = Meteor.subscribe('companies')
    if (subscribed.ready()) {
      data.companies = Companies.find().fetch();
    }
    return data;
  },
  validations() {
    let component = this;

    return {
      rules: {
        company: {
          required: true,
          minlength: 3
        },
        firstname: {
          required: true
        },
        lastname: {
          required: true,
        },
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 6
        }
      },
      messages: {
        company: {
          required: 'Renseignez le nom de l\'entreprise.',
          minlength: 'Au moins 3 caractères'
        },
        firstname: {
          required: 'Renseignez votre prénom.'
        },
        lastname: {
          required: 'Renseignez votre nom.'
        },
        email: {
          required: 'Renseignez votre email.',
          email: 'Cette adresse n\'est pas valide'
        },
        password: {
          required: 'Renseignez votre mot de passe.',
          minlength: 'Au moins 6 caractères, svp.'
        }
      },
      submitHandler() {
        let { getValue }     = ReactHelpers,
            form             = component.refs.signupForm.refs.form,
            firstname        = getValue( form, '[name="firstname"]' ),
            lastname         = getValue( form, '[name="lastname"]' ),
            company          = getValue( form, '[name="company"]' ),
            email            = getValue( form, '[name="emailAddress"]' ),
            password         = getValue( form, '[name="password"]' );


        let callInsertUser = function(email, password, companyId, firstname, lastname) {
          Meteor.call('addUser', email, password, companyId, firstname, lastname, function (error) {
            if (error) {
              Bert.alert(error.reason, 'danger');
              $('[type="submit"]').removeClass('is-loading').html("S'inscrire");
            }
            else {
              FlowRouter.go( 'login' );
              Bert.alert("Votre compte a été créé. Vérifiez votre mail pour pouvoir vous connecter.", 'info')
            }
          })
        }

        if (Companies.find({name: company}).count() == 1) {
          callInsertUser(email, password, Companies.findOne({name: company})._id, firstname, lastname)
        }
        else {
          Meteor.call('insertCompany', company, function (error, response) {
            callInsertUser(email, password, response, firstname, lastname)
          })
        }
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
            <Subtitle size="4">Inscription</Subtitle>
            <Form ref="signupForm" id="signup" className="signup" validations={ this.validations() } onSubmit={ this.handleSubmit }>
              <FormControl>
                <input
                  type="text"
                  className="input"
                  ref="firstname"
                  name="firstname"
                  placeholder="Prénom"/>
              </FormControl>
              <FormControl>
                <input
                  type="text"
                  className="input"
                  ref="lastname"
                  name="lastname"
                  placeholder="Nom"/>
              </FormControl>
              <FormControl>
                <input
                  type="text"
                  className="input"
                  ref="company"
                  name="company"
                  placeholder="Société"/>
              </FormControl>
              <FormControl icon="envelope">
                <input
                  type="email"
                  className="input"
                  ref="emailAddress"
                  name="emailAddress"
                  placeholder="Adresse email"/>
              </FormControl>
              <FormControl icon="lock">
                <input
                  type="password"
                  className="input"
                  ref="password"
                  name="password"
                  placeholder="Mot de passe"/>
              </FormControl>
              <Button type="submit" style="primary">S'inscrire</Button>
            </Form>
            <p>Vous possédez déjà un compte ? <a href="/login">Se connecter</a>.</p>
          </Column>
        </Row>
      </Container>
    </Section>
  }
});
