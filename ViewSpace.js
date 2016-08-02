var InformationBlock = React.createClass({
    render: function() {
        return(
          <div className="tabs" id={this.props.id}>
            <h3>{this.props.title}</h3>
            {this.props.text}
          </div>);            
    }
  });

var InformationBlockAccordionTitle = React.createClass({
  render: function() {
    return(<h3>{this.props.title}</h3>);
  }
});

var InformationBlockAccordion = React.createClass({
  render: function() {
    return(
      <div>
      <p>{this.props.text}</p>
      </div>
      );
  }
});

  var InformationContainer = React.createClass({
    render:function(){
      var rows = [];
      var lastBlock = null;
      if(this.props.mobile){
        this.props.blocks.forEach(function(block){
        if(block !== lastBlock){
          rows.push(<InformationBlockAccordionTitle title={block.title});
          rows.push(<InformationBlockAccordion text={block.text}/>);
        }
        lastBlock = block;
        })
        return(<div id='accordion'>{rows}</div>);
      }          
    else{
      this.props.blocks.forEach(function(block){
        if(block !== lastBlock){
          rows.push(<InformationBlock id={block.id} title={block.title} text={block.text}/>);
        }
        lastBlock = block;
        })
      return(<div>{rows}</div>);
    }
    }
  });

  var Title = React.createClass({
    render: function(){
      return(<li><a href={'#' + this.props.id}>{this.props.title}</a></li>);
    }
  });

var TabsList = React.createClass({
  render:function(){
      var tabs = [];
      var lastBlock = null;
      if(this.props.mobile){
          return null;
      }
      else{
        this.props.blocks.forEach(function(block){
          if(block !== lastBlock){
            tabs.push(<Title title={block.title} id={block.id}/>);
          }
          lastBlock = block;
        })
          return(
          <ul id="tabs-list">
            {tabs}
          </ul>
        );     
      }    
    }

});

var ViewSpace = React.createClass({
  getInitialState: function(){
    if(window.innerWidth <= 480)
      return{ mobile: true }
    else
      return{ mobile: false }
  },

  handleResize: function(mobile){
    if(window.innerWidth <= 480){
      this.setState({ mobile: true });
    }

    else{
      this.setState({ mobile: false });
    }
      
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function(){
    return(
      <div>
      <TabsList blocks={this.props.blocks} mobile={this.state.mobile} />
      <InformationContainer blocks={this.props.blocks} mobile={this.state.mobile} />
      </div>
    );
  }
});

var HANDBOOK = [
{id: '1', title: 'Title 1', text: 'This is some text.'},
{id: '2', title: 'Title 2', text: 'This is some text.'},
{id: '3', title: 'Title 3', text: 'This is some text.'}
];

ReactDOM.render(
  <ViewSpace blocks={HANDBOOK} />,
  document.getElementById('tabs')
);