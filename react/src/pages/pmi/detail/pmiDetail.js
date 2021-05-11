import React from 'react';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';

class PmiDetailTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = getDataSource(props.data.key);
  }
  render() {
    let { FirstName, LastName } = this.props.data.data;
    return (
      <React.Fragment>
        <div className="master-detail-caption">
          Detail Information
        </div>
        <DataGrid
          dataSource={this.dataSource}
          showBorders={true}
          columnAutoWidth={true}
        >
          <Column dataField="exchangePairName" />
          <Column dataField="exchange" />
          <Column dataField="createdAt" />
        </DataGrid>
      </React.Fragment>
    );
  }
  completedValue(rowData) {
    return rowData.Status === 'Completed';
  }
}

function getDataSource(key) {
    return new CustomStore({
      load: function(loadOptions) {
          let repKey = key.replace('/', '-');
        return fetch(`http://localhost:6000/api/v1/pair-info/detailed/${repKey}`)
          .then(response => response.json())
          .then((data) => {
            return {
              data: data.details,
              totalCount: 5,
              summary: 5,
              groupCount: 5
            };

          })
          .catch(() => { throw 'Data Loading Error'; });
      }
    });;
  }

export default PmiDetailTemplate;