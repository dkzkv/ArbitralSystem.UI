import React from 'react';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import Form, {
  SimpleItem,
  GroupItem,
  Label
} from 'devextreme-react/form';
import 'devextreme-react/text-area';

class ServerDetailTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.data.key,
      dataD: null
    };
    this.detailDataChange = this.detailDataChange.bind(this);
    this.dataSource = this.getDataSource(props.data.key);

    
  }
  componentDidMount(){
    this.setState({
      detailData: {name: "srv_1"},
      
    })
    fetch(`http://localhost:7001/api/v1/server/${this.state.key}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        dataD: data
      })
    })
    .catch(() => { throw 'Data Loading Error'; });
  }
  detailDataChange(event) {
    this.setState({detailData: event});
  }

  render() {
    return (
      <React.Fragment>
        <div className="master-detail-caption">
         Server Detail Information
         <Form formData={this.state.dataD}>
         <GroupItem colCount={2}>
         <GroupItem colSpan={3}>
            <SimpleItem editorOptions={{ disabled: true }} dataField="name" />
            <SimpleItem editorOptions={{ disabled: true }} dataField="serverType" />
            <SimpleItem editorOptions={{ disabled: true }} dataField="maxWorkersCount" />
          </GroupItem>
          <GroupItem colSpan={3}>
            <SimpleItem editorOptions={{ disabled: true }} dataField="createdAt" />
            <SimpleItem editorOptions={{ disabled: true }} dataField="modifyAt" />
          </GroupItem>
         </GroupItem>
         
          </Form>
        </div>
     
        <div className="master-detail-caption">
         Distributors List
        </div>
        <DataGrid
          dataSource={this.dataSource}
          showBorders={true}
          columnAutoWidth={true}
        >
          <Column dataField="id" />
          <Column dataField="name" />
          <Column dataField="status" />
          <Column dataField="createdAt" />
        </DataGrid>
      </React.Fragment>
    );
  }
  completedValue(rowData) {
    return rowData.Status === 'Completed';
  }

 
  

  getDataSource(key) {
    return new CustomStore({
      load: function(loadOptions) {
          let repKey = key.replace('/', '-');
        return fetch(`http://localhost:7001/api/v1/server/${repKey}`)
          .then(response => response.json())
          .then((data) => {
            return {
              data: data.distributors,
              totalCount: 1,
              summary: 1,
              groupCount:1,
              detailData: data
            };

          })
          .catch(() => { throw 'Data Loading Error'; });
      }
    });;
  }
}



export default ServerDetailTemplate;