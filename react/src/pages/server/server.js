 
import React from 'react';
import './server.scss';
import ServerDetailTemplate from './detail/serverDetail.js';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import 'devextreme-react/text-area';
import Form, {
  SimpleItem,
  GroupItem,
  Label
} from 'devextreme-react/form';
import DataGrid, {
  Column,
  Pager,
  Paging,
  Sorting,
  FilterRow,
  MasterDetail
} from 'devextreme-react/data-grid';



class ServerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      typeValue: null,
    };
    this.stateOptions = {
      items: types
    };

    this.formFieldDataChanged = this.formFieldDataChanged.bind(this);

  }


  formFieldDataChanged(e) {
    const updatedField = e.dataField;
    const newValue = e.value;
    this.setState({
      typeValue: newValue
    })
    // Event handling commands go here
}

  render() {

    return (
      
    <React.Fragment>
      <div class="wrap">
      Server Information
      </div>
      <Form onFieldDataChanged={this.formFieldDataChanged}>
      <GroupItem colCount={3}>
      <SimpleItem
              colSpan={1}
              dataField="Type"
              editorType="dxSelectBox"
              editorOptions={this.stateOptions} />
      </GroupItem>
      </Form>
     
      <DataGrid
      className={'dx-card wide-card'}
      dataSource={gridSource(this.state)}
      ref={(ref) => this.dataGrid = ref}
      selection={{ mode: 'single' }}
      showBorders={false}
      focusedRowEnabled={true}
      defaultFocusedRowIndex={0}
      columnAutoWidth={true}
      columnHidingEnabled={true}
      remoteOperations={true}
    >
      <Paging defaultPageSize={5} />
      <Sorting mode="none" />
      <Pager showPageSizeSelector={true}
             allowedPageSizes={[5]}
             showInfo={true} />
      <FilterRow visible={false} />
      <Column dataField={'id'} hidingPriority={1} />
      <Column dataField={'activeWorkers'} hidingPriority={2} />
      <Column dataField={'name'} hidingPriority={3} />
      <Column dataField={'serverType'} hidingPriority={4} />
      <Column dataField={'maxWorkersCount'} hidingPriority={5} />
      <Column dataField={'createdAt'} hidingPriority={6} />
      <Column dataField={'modifyAt'} hidingPriority={7} />
      <Column dataField={'isDeleted'} hidingPriority={8} />
      <MasterDetail
      enabled={true}
      component={ServerDetailTemplate}
    />
   
    </DataGrid>
      </React.Fragment>
    );
  }
}




export default ServerComponent

function gridSource(objectState) {
  return new CustomStore({
    key: 'id',
    load: function(loadOptions) {
      let params = '?';
      let count = 5;
      let offset = loadOptions.skip;
  
      params += `${'count'}=${JSON.stringify(count)}&`; 
      params += `${'offset'}=${JSON.stringify(offset)}&`; 
  
     if(!!objectState.typeValue){
        params += `${'type'}=${objectState.typeValue}&`; 
      }
      params = params.slice(0, -1);
      return fetch(`http://localhost:7001/api/v1/server${params}`)
        .then(response => response.json())
        .then((data) => {
          return {
            data: data.items,
            totalCount: data.total,
            summary: data.total,
            groupCount: data.total
          };
        })
        .catch(() => { throw 'Data Loading Error'; });
    }
  });;
}
export const types = [
  0
];



