class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      user: '',
      info: {}
    };

    this.nextPage = this.nextPage.bind(this);
    this.purchase = this.purchase.bind(this);
  }

  nextPage() {
    var currentPage = this.state.page;

    if (document.getElementById('myForm') !== null) {
      var formInputs = document.getElementById('myForm').elements;

      var newInfo = {}
      Array.from(formInputs).forEach((input) => {
        newInfo[input.name] = input.value;
      });

      newInfo.user = this.state.user;

      var newState = {
        page: currentPage + 1
      };

      if (currentPage === 1 || currentPage === 2) {
        $.ajax({
          url: '/info',
          type: 'POST',
          data: newInfo,
          success: (update) => { console.log(update); this.setState(newState);}
        });
      }
      if (currentPage === 3) {
        $.ajax({
          url: '/info',
          type: 'POST',
          data: newInfo,
          success: (update) => {
            console.log(update);
            $.ajax({
              url: '/stuff',
              type: 'PUT',
              data: newInfo,
              success: (entry) => { 
                console.log(entry);   
                newState.info = entry;
                this.setState(newState);
              }
            });
          }
        });
      }

    } else {
      $.ajax({
        url: '/checkout',
        type: 'POST',
        success: (response) => {
          console.log('New user created:', response);
          this.setState({page: currentPage + 1, user: response});
        }
      });
    }
  }

  purchase() {
    this.setState({page: 0});
  }

  render() {
      if (this.state.page === 0) return <Home next={this.nextPage} />;
      if (this.state.page === 1) return <F1 next={this.nextPage} />;
      if (this.state.page === 2) return <F2 next={this.nextPage} />;
      if (this.state.page === 3) return <F3 next={this.nextPage} />;
      if (this.state.page === 4) return <Summary purchase={this.purchase} info={this.state.info}/>;
  }
}

let Home = (props) => {
  return (
    <div id="home">
      <p>Home</p>
      <button onClick={props.next} >Go to Checkout!</button>
    </div>
  );
};

let F1 = (props) => {
  return (
    <div>
      <form id="myForm">
        <table>
            <thead><tr><th scope="col" colSpan="2">Account Info</th></tr></thead>
            <tbody>
            <tr><th scope="row">Name</th><td><input name="name" type="text" placeholder="First and Last"></input></td></tr>
            <tr><th scope="row">Email</th><td><input name="email" type="text" placeholder="example: abc@123.com"></input></td></tr>
            <tr><th scope="row">Password</th><td><input name="password" type="text" placeholder="password..."></input></td></tr>
            <tr><th scope="row">Phone #</th><td><input name="phoneNumber" ype="text" placeholder="###-###-####"></input></td></tr>
            </tbody>
        </table>
      </form>
      <p></p>
      <button onClick={props.next} >Next</button>
    </div>
  );
};

let F2 = (props) => {
  return (
    <div>
      <form id="myForm">
        <table>
            <thead><tr><th scope="col" colSpan="2">Shipping Address</th></tr></thead>
            <tbody>
            <tr><th scope="row">Line 1</th><td><input name="line1" type="text" placeholder="line 1"></input></td></tr>
            <tr><th scope="row">Line 2</th><td><input name="line2" type="text" placeholder="line 2"></input></td></tr>
            <tr><th scope="row">City</th><td><input name="city" type="text" placeholder="City"></input></td></tr>
            <tr><th scope="row">State</th><td><input name="state" type="text" placeholder="State"></input></td></tr>
            <tr><th scope="row">Zip</th><td><input name="zip" type="text" placeholder="Zip"></input></td></tr>
            </tbody>
        </table>
      </form>
      <p></p>
      <button onClick={props.next} >Next</button>
    </div>
  );
};

let F3 = (props) => {
  return ( 
    <div>
      <form id="myForm">
        <table>
            <thead><tr><th scope="col" colSpan="2">Credit Card</th></tr></thead>
            <tbody>
            <tr><th scope="row">Card #</th><td><input name="cardNumber" type="text" placeholder="###############"></input></td></tr>
            <tr><th scope="row">Expiry</th><td><input name="expiry" type="text" placeholder="MM/YY"></input></td></tr>
            <tr><th scope="row">CVV</th><td><input name="cvv" type="text" placeholder="cvv"></input></td></tr>
            <tr><th scope="row">Billing Zip</th><td><input name="billingZip" type="text" placeholder="Billing Zip"></input></td></tr>
            </tbody>
        </table>
      </form>
      <p></p>
      <button onClick={props.next} >To Summary</button>
    </div>
  );
};

let Summary = (props) => {
  return ( 
    <div>
      <table>
        <thead><tr><th scope="col" colSpan="2">Account Info</th></tr></thead>
        <tbody>
          <tr><th scope="row">Name</th><td>{props.info.name}</td></tr>
          <tr><th scope="row">Email</th><td>{props.info.email}</td></tr>
          <tr><th scope="row">Password</th><td>{props.info.password}</td></tr>
          <tr><th scope="row">Phone #</th><td>{props.info.phoneNumber}</td></tr>
        </tbody>
      </table>
      <table>
        <thead><tr><th scope="col" colSpan="2">Shipping Address</th></tr></thead>
        <tbody>
          <tr><th scope="row">Line 1</th><td>{props.info.line1}</td></tr>
          <tr><th scope="row">Line 2</th><td>{props.info.line2}</td></tr>
          <tr><th scope="row">City</th><td>{props.info.city}</td></tr>
          <tr><th scope="row">State</th><td>{props.info.state}</td></tr>
          <tr><th scope="row">Zip</th><td>{props.info.zip}</td></tr>
        </tbody>
      </table>
      <table>
        <thead><tr><th scope="col" colSpan="2">Credit Card</th></tr></thead>
        <tbody>
          <tr><th scope="row">Card #</th><td>{props.info.cardNumber}</td></tr>
          <tr><th scope="row">Expiry</th><td>{props.info.expiry}</td></tr>
          <tr><th scope="row">CVV</th><td>{props.info.cvv}</td></tr>
          <tr><th scope="row">Billing Zip</th><td>{props.info.billingZip}</td></tr>
        </tbody>
      </table>
      <p></p>
      <button onClick={props.purchase} >Confirm Purchase</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));