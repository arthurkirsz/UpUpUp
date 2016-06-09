// Unused at the moment (comming soon)
Skills = React.createClass({
  render() {
    return <table className="table is-bordered is-striped is-narrow">
      <tbody>
        <tr>
          <td>
            <Subtitle size="5">Capacité dadaptation</Subtitle>
            <p>Saura-t-il travailler dans un environnement qui évolue vite</p>
          </td>
          <td>
            <Button style="">
              <i className="fa material-icons">sentiment_very_dissatisfied</i>
            </Button>
          </td>
          <td>
            <Button style="">
              <i className="fa material-icons">sentiment_dissatisfied</i>
            </Button>
          </td>
          <td>
            <Button style="">
              <i className="fa material-icons">sentiment_satisfied</i>
            </Button>
          </td>
          <td>
            <Button style="">
              <i className="fa material-icons">sentiment_very_satisfied</i>
            </Button>
          </td>
          <td width="150">
            <i className="fa material-icons">sentiment_neutral</i>
          </td>
        </tr>
        <tr>
          <td>
            <Subtitle size="5">Expérience précédente</Subtitle>
            <p>Comment s'en est il sorti dans son précédent poste</p>
          </td>
          <td>
            <Button style="danger">
              <i className="fa fa-thumbs-o-down"></i>
            </Button>
          </td>
          <td>
            <Button style="danger">
              <i className="fa fa-thumbs-o-down"></i>
            </Button>
          </td>
          <td>
            <Button style="success">
              <i className="fa fa-thumbs-o-up"></i>
            </Button>
          </td>
          <td>
            <Button style="success">
              <i className="fa fa-thumbs-o-up"></i>
            </Button>
          </td>
          <td width="150">
            <i className="fa fa-dot-circle-o"></i>
          </td>
        </tr>
        <tr>
          <td>
            <Subtitle size="5">Passion</Subtitle>
            <p>Aime-t-il notre produit/service</p>
          </td>
          <td>
            <Button style="danger">
              <i className="fa fa-thumbs-o-down"></i>
            </Button>
          </td>
          <td>
            <Button style="danger">
              <i className="fa fa-thumbs-o-down"></i>
            </Button>
          </td>
          <td>
            <Button style="success">
              <i className="fa fa-thumbs-o-up"></i>
            </Button>
          </td>
          <td>
            <Button style="success">
              <i className="fa fa-thumbs-o-up"></i>
            </Button>
          </td>
          <td width="150"></td>
        </tr>
        <tr>
          <td>
            <Subtitle size="5">Ethique</Subtitle>
            <p>Va-t-il aider l'équipe à donner le meilleur d'elle même</p>
          </td>
          <td>
            <Button style="danger">
              <i className="fa fa-thumbs-o-down"></i>
            </Button>
          </td>
          <td>
            <Button style="danger">
              <i className="fa fa-thumbs-o-down"></i>
            </Button>
          </td>
          <td>
            <Button style="success">
              <i className="fa fa-thumbs-o-up"></i>
            </Button>
          </td>
          <td>
            <Button style="success">
              <i className="fa fa-thumbs-o-up"></i>
            </Button>
          </td>
          <td width="150"></td>
        </tr>
      </tbody>
    </table>
  }
})
