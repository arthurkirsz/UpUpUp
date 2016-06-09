TagsList = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    var handle = Meteor.subscribe( 'tags' );

    return {
      isLoading: !handle.ready(),
      tags: Tags.find().fetch().map( ( tag ) => {
        return { uid: tag._id, label: tag.name };
      })
    };
  },
  getInitialState() {
    return {
      editing: null
    };
  },
  toggleEditing( itemId ) {
    this.setState( { editing: itemId } );
  },
  cancelEditItem( itemId ) {
    this.setState( { editing: null } );
  },

  handleTagDelete( uid ) {
    if(confirm('Action irréversible. Continuer ?')) {
      Meteor.call( 'deleteTag', uid, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          this.setState( { editing: null } );
          Bert.alert( 'Tag deleted!', 'success' );
        }
      });
    }
  },
  handleTagUpdate( update ) {
    Meteor.call( 'updateTag', update, ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        this.setState( { editing: null } );
        Bert.alert( 'Tag updated!', 'success' );
      }
    });
  },
  handleEditField( event ) {
    if ( event.keyCode === 13 ) {
      let target = event.target,
          update = {};

      update._id = this.state.editing;
      update[ target.name ] = target.value;

      this.handleTagUpdate( update );
    }
  },
  handleEditItem() {
    let itemId = this.state.editing;

    this.handleTagUpdate({
      _id: itemId,
      name: this.refs[ `name_${ itemId }` ].value
    });
  },
  renderItemOrEditField( item ) {
    if ( this.state.editing === item.uid ) {
      return <li key={ `editing-${ item.uid }` } className="list-group-item">
        <Row mobile={true}>
          <Column size="auto">
            <FormControl icon="tag">
              <input
                onKeyDown={ this.handleEditField }
                type="text"
                className="input"
                ref={ `name_${ item.uid }` }
                name="name"
                defaultValue={ item.label } />
            </FormControl>
          </Column>
          <Column size="4">
            <div className="is-pulled-right">
              <Button style="" onClick={ this.cancelEditItem }>
                Annuler
              </Button>
              &nbsp;
              <Button onClick={ this.handleEditItem } style="primary">
                Enregistrer
              </Button>
            </div>
          </Column>
        </Row>
      </li>;
    } else {
      return <li key={ item.uid } className="list-group-item">
        <span className="tag is-info">{ `${ item.label }` }</span>

        <a className="pull-right" onClick={ this.handleTagDelete.bind( null, item.uid ) }>
          <i className="ion-close"></i> Supprimer
        </a>
        <span className="pull-right">&nbsp;&nbsp;</span>
        <a className="pull-right" onClick={ this.toggleEditing.bind( null, item.uid ) }>
          <i className="ion-edit"></i> Editer
        </a>
      </li>;
    }
  },
  render() {
    if(this.data.isLoading) {
      return <Loading/>
    }
    else {
      return <Section>
        <Container>
          <Row>
            <Column size="auto">
              <Subtitle size="3">Tags</Subtitle>
              <ul className="list-group">
                {this.data.tags.map( ( item ) => {
                  return this.renderItemOrEditField( item );
                })}
              </ul>
            </Column>
          </Row>
        </Container>
      </Section>
    }
  }
});
