import React, { Component } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import tick from "../../../../../assets/img/icons/tick.svg";
import { history } from "../../../../../history";
import {
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "react-feather";
import { connect } from "react-redux";
import {
  getDataRewards,
  updateDataReward,
} from "../../../../../redux/actions/dataListRewards/index";
import Checkbox from "../../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "./../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "./../../../../../assets/scss/pages/data-list.scss";
import Moment from "react-moment";
import { Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import Chip from "../../../../../components/@vuexy/chips/ChipComponent";
const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important",
      },
    },
  },
};
const chipColors = {
  0: "warning",
  1: "success",
};
const chipText = {
  0: "Chờ tặng quà ",
  1: "Đã tặng quà ",
};
const chipColorsNet = {
  0: "primary",
  1: "info",
};
const chipTextNet = {
  0: "Thuê bao trả sau ",
  1: "Thuê bao trả trước",
};
const chipRewardText = {
  "5f55e50a1c8e287eee105c3d": "Thẻ cào 20k",
  "5f56270c07a6402682d902df": "Thẻ cào 100k",
  "5f570053925a6831c2fdb0cf": "Voucher",
  "5f56271607a6402682d902e0": "Thẻ cào 10k",
};
const chipRewardColor = {
  "5f55e50a1c8e287eee105c3d": "primary",
  "5f56270c07a6402682d902df": "success",
  "5f570053925a6831c2fdb0cf": "warning",
  "5f56271607a6402682d902e0": "danger",
};
const ActionsComponent = (props) => {
  function confirm(e) {
    const { parsedFilter, updateData, row } = props;
    let params = Object.keys(parsedFilter).length
      ? parsedFilter
      : { page: 1, perPage: 4 };
    updateData(row, params);
  }
  function cancel(e) {
    message.error("Hủy thay đổi trạng thái  dữ liệu!");
  }
  return (
    <div className="data-list-action">
      {!props.row.status ? (
        <Popconfirm
          title="Bạn có muốn thay đổi trạng thái ?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Có "
          cancelText="Không"
        >
          <RefreshCcw
            style={{ marginLeft: "20px" }}
            className="cursor-pointer"
            size={20}
          />
        </Popconfirm>
      ) : (
        <div
          style={{
            width: "20px",
            marginLeft: "20px",
          }}
        >
          <img src={tick} alt="tick" />
        </div>
      )}
    </div>
  );
};

class DataListReward extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.data,
        allData: props.dataList.filteredData,
        totalPages: props.dataList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.totalRecords,
        sortIndex: props.dataList.sortIndex,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Họ Tên ",
        selector: "name",
        sortable: true,
        minWidth: "140px",
        cell: (row) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <p title={row.email} className="text-truncate text-bold-500 mb-0">
            {row.email}
          </p>
        ),
      },
      {
        name: "Số điện thoại",
        selector: "phone",
        sortable: true,
        minWidth: "180px",
        cell: (row) => (
          <p
            title={row.phone_number}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.phone_number}
          </p>
        ),
      },
      {
        name: "Nhà mạng",
        selector: "nhaMang",
        sortable: true,
        minWidth: "150px",
        cell: (row) => (
          <p title={row.network} className="text-truncate text-bold-500 mb-0">
            {row.network}
          </p>
        ),
      },
      {
        name: "Thuê bao trả trước",
        selector: "thuebao",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <Chip
            className="m-0"
            color={chipColorsNet[row.prepaid_account]}
            text={chipTextNet[row.prepaid_account]}
          />
        ),
      },
      {
        name: "Ngày tạo",
        selector: "date_create",
        sortable: true,
        minWidth: "180px",
        cell: (row) => <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>,
      },
      {
        name: "Phần thưởng",
        selector: "reward",
        sortable: true,
        minWidth: "180px",
        cell: (row) => (
          <Chip
            className="m-0"
            color={chipRewardColor[row.gift_id]}
            text={chipRewardText[row.gift_id]}
          />
        ),
      },
      {
        name: "Trạng thái ",
        selector: "status",
        sortable: true,
        minWidth: "170px",
        cell: (row) => (
          <Chip
            className="m-0"
            color={chipColors[row.status]}
            text={chipText[row.status]}
          />
        ),
      },
      {
        name: "Thao tác",
        sortable: true,
        minWidth: "150px",
        cell: (row) => (
          <ActionsComponent
            row={row}
            getData={this.props.getData}
            parsedFilter={this.props.parsedFilter}
            currentData={this.handleCurrentData}
            updateData={this.props.updateDataReward}
            updateDataCancel={this.props.updateDataRewardCancel}
          />
        ),
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    const { getDataRewards, parsedFilter } = this.props;
    getDataRewards(parsedFilter);
  }

  handleFilter = (e) => {
    const { filterData } = this.props;
    this.setState({ value: e.target.value });
    filterData(e.target.value);
  };

  handleRowsPerPage = (value) => {
    let { parsedFilter, getDataRewards } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/reward?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getDataRewards({ page: parsedFilter.page, perPage: value });
  };

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
  };
  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
    this.handleSidebar(true);
  };

  handlePagination = (page) => {
    let { parsedFilter, getDataRewards } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    history.push(`/reward?page=${page.selected + 1}&perPage=${perPage}`);
    getDataRewards({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  render() {
    let { columns, data, allData, totalPages, value, sidebar } = this.state;
    return (
      <div
        className={`data-list ${
          this.props.thumbView ? "thumb-view" : "list-view"
        }`}
      >
        <DataTable
          columns={columns}
          data={value.length ? allData : data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={(page) => this.handlePagination(page)}
            />
          )}
          noHeader
          subHeader
          selectableRows
          responsive
          pointerOnHover
          selectableRowsHighlight
          onSelectedRowsChange={(data) =>
            this.setState({ selected: data.selectedRows })
          }
          customStyles={selectedStyle}
          sortIcon={<ChevronDown />}
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={{
            color: "primary",
            icon: <Check className="vx-icon" size={12} />,
            label: "",
            size: "sm",
          }}
        />
        <div
          className={classnames("data-list-overlay", {
            show: sidebar,
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.dataListReward,
  };
};

export default connect(mapStateToProps, {
  getDataRewards,
  updateDataReward,
})(DataListReward);
