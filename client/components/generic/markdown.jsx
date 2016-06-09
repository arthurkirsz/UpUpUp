MarkdownEditor = React.createClass({
  getInitialState() {
    const placeholder = {
        text: this.props.placeholder
    };
    const toolbar = {
      buttons: [
        {
            name: 'h1',
            action: 'append-h1',
            aria: 'Titre niv. 1',
            tagNames: ['h1'],
            contentDefault: '<b>H<sub>1</sub></b>'
        },
        {
            name: 'h2',
            action: 'append-h2',
            aria: 'Titre niv. 2',
            tagNames: ['h2'],
            contentDefault: '<b><sub>H2</sub></b>'
        },
        {
            name: 'bold',
            action: 'bold',
            aria: 'Gras',
            tagNames: ['strong'],
            contentDefault: '<i class="fa fa-bold"></i>',
        },
        {
            name: 'strikethrough',
            action: 'strikethrough',
            aria: 'barré',
            tagNames: ['strike'],
            style: {
                prop: 'text-decoration',
                value: 'line-through'
            },
            useQueryState: true,
            contentDefault: '<i class="fa fa-strikethrough"></i>',
            contentFA: ''
        },
        {
            name: 'orderedlist',
            action: 'insertorderedlist',
            aria: 'liste ordonnée',
            tagNames: ['ol'],
            useQueryState: true,
            contentDefault: '<i class="fa fa-list-ol"></i>'
        },
        {
            name: 'unorderedlist',
            action: 'insertunorderedlist',
            aria: 'liste',
            tagNames: ['ul'],
            useQueryState: true,
            contentDefault: '<i class="fa fa-list-ul"></i>'
        },
        {
            name: 'anchor',
            aria: 'lien',
            action: 'createLink',
            tagNames: ['a'],
            contentDefault: '<i class="fa fa-link"></i>'
        },
        // Known inline elements that are not removed, or not removed consistantly across browsers:
        // <span>, <label>, <br>
        {
            name: 'removeFormat',
            aria: 'réinitialiser format',
            action: 'removeFormat',
            contentDefault: '<i class="fa fa-eraser"></i>'
        }
      ]
    };

    const anchor = {
      customClassOption: null,
      customClassOptionText: 'Button',
      linkValidation: true,
      placeholderText: 'Saisir ou coller un lien',
      targetCheckbox: true,
      targetCheckboxText: 'Ouvrir dans une nouvelle fenêtre'
    };
    const paste = {
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['id', 'style'],
        cleanTags: ['meta', 'br']
    };

    return {
      anchor,
      toolbar,
      paste,
      placeholder
    }
  },
  changeEvent(event, returnedText) {
    // console.log(returnedText);
    this.props.handle(returnedText);
  },
  render() {
    return (
        <MediumEditorComp
          placeholder={this.state.placeholder}
          anchor={this.state.anchor}
          toolbar={this.state.toolbar}
          paste={this.state.paste}
          onChange={this.props.onChange}
          defaultValue={this.props.content} />
    )
  }
});
