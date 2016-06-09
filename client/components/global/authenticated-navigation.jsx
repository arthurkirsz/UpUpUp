AuthenticatedNavigation = React.createClass({
  componentDidMount(){
    $('#header-toggle').removeClass('is-active');
    $('#header-menu').removeClass('is-active');
  },
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let userEmail = Meteor.user().emails[0].address;
    let remindersSub = Meteor.subscribe("reminders")
    let endOfDay = moment().endOf("day").toDate().getTime()
    let reminders = Reminders.find({"user": Meteor.userId(), "type": ReminderTypes.NOTIFICATION, "date": { $lt: endOfDay } }).fetch();
    that = this;
    setTimeout(function() {
      that.handleNotifications()
    }, 3000)
    return {
      items: [
        { uid: 'candidates', href: '/candidates', label: 'Candidats' },
        { uid: 'tags', href: '/tags', label: 'Tags' },
        {
          uid: 'currentUser',
          href: '#',
          label: userEmail,
          dropdown: true,
          dropdownItems: [
            { uid: 'logout', href: '#', label: 'Logout', action: () => {
              return Meteor.logout( () => {
                FlowRouter.go( '/login' );
              });
            }}
          ]
        }
      ],
      notifications: reminders
    };
  },
  logout() {
    Meteor.logout( () => {
      FlowRouter.go( '/login' );
    });
  },
  handleNotifications() {
    _.forEach(this.data.notifications, function (reminder) {
      let now = moment().toDate().getTime();
      let time = reminder.date - now;
      let timeout = setTimeout(function() {
        Reminders.remove(reminder._id)
        lodash.remove(Pools.timeoutNotifications, function(to) {
          if (to.reminder == reminder._id) {
            clearTimeout(to.timeout)
            return true;
          }
          else {
            return false;
          }
        })
        new Notification("Rappel", {
          body: reminder.content,
          icon: "/logo.png"
        });
      }, Math.max(time, 0))
      Pools.timeoutNotifications.push({"reminder": reminder._id, "timeout": timeout})
    })
  },
  render() {
    // <NavBarNav position={ `navbar-left` } items={ this.data.items } />
    return <div id="header-menu" className="header-right header-menu">
      <a className="header-item" href="/candidates">
        Candidats
      </a>
      <a className="header-item" href="/tags">
        Tags
      </a>
      <a className="header-item" onClick={this.logout}>
        Déconnexion
      </a>
    </div>;
  }
});
