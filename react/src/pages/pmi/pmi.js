import React from 'react';
import './pmi.scss';
import PmiDetailTemplate from './detail/pmiDetail.js';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import 'devextreme-react/text-area';
import DataGrid, {
  Column,
  Pager,
  Paging,
  Sorting,
  FilterRow,
  MasterDetail
} from 'devextreme-react/data-grid';



class PmiComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      baseCurrency: null,
      quoteCurrency: null,
      occurencesCount: null,
      exchange: null
    };
    this.baseCurrencyChange = this.baseCurrencyChange.bind(this);
    this.occurencesCountChange = this.occurencesCountChange.bind(this);
    this.quoteCurrencyChange = this.quoteCurrencyChange.bind(this);
    this.exchangeChange = this.exchangeChange.bind(this);
  }

  exchangeChange(event) {
    this.setState({exchange: event.target.value});
  }

  baseCurrencyChange(event) {
    this.setState({baseCurrency: event.target.value});
  }

  occurencesCountChange(event) {
    this.setState({occurencesCount: event.target.value});
  }
  
  quoteCurrencyChange(event) {
    this.setState({quoteCurrency: event.target.value});
  }


  render() {

    return (

    <React.Fragment>
      <div class="input-block wrap">
        <label for="baseCurrency">BaseCurrency:</label>
        <input type="text" id="baseCurrency" value={this.state.baseCurrency} onChange={this.baseCurrencyChange} />
      </div>
      <div class="input-block">
        <label for="baseCurrency">QuoteCurrency:</label>
        <input type="text" id="baseCurrency" value={this.state.quoteCurrency} onChange={this.quoteCurrencyChange} />
      </div>
      <div class="input-block">
        <label for="baseCurrency">OccurencesCount:</label>
        <input type="text" id="baseCurrency" value={this.state.occurencesCount} onChange={this.occurencesCountChange} />
      </div>
      <div class="input-block">
      <label for="exchange">Exchange:</label>
      <input type="text" id="exchange" value={this.state.exchange} onChange={this.exchangeChange} />
      </div>

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
      <Column dataField={'unificatedPairName'} hidingPriority={1} />
      <Column dataField={'baseCurrency'} hidingPriority={3} />
      <Column dataField={'quoteCurrency'}  hidingPriority={4} />
      <Column dataField={'occurrencesCount'}  hidingPriority={2} />
      <MasterDetail
      enabled={true}
      component={PmiDetailTemplate}
    />
      
    </DataGrid>
   
      </React.Fragment>
    );
  }
}

export default PmiComponent

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== '';
}

function gridSource(objectState) {
  return new CustomStore({
    key: 'unificatedPairName',
    load: function(loadOptions) {
      let params = '?';
      let count = 5;
      let offset = loadOptions.skip;
  
      params += `${'count'}=${JSON.stringify(count)}&`; 
      params += `${'offset'}=${JSON.stringify(offset)}&`; 
  
      if(!!objectState.baseCurrency){
        params += `${'baseCurrency'}=${objectState.baseCurrency}&`; 
      }
      if(!!objectState.quoteCurrency){
        params += `${'quoteCurrency'}=${objectState.quoteCurrency}&`; 
      }
      if(!!objectState.occurencesCount){
        params += `${'ListedMoreThan'}=${objectState.occurencesCount}&`; 
      }
      if(!!objectState.exchange){
        params += `${'exchange'}=${objectState.exchange}&`; 
      }
      params = params.slice(0, -1);
      return fetch(`http://localhost:6000/api/v1/pair-info/unique${params}`)
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


