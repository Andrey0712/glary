import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./DataTableOder.css";
import { push } from "connected-react-router";
import { chack_status, getOrders, list_Items } from "../../../actions/orders";
import { getShowList } from "../../../actions/show";
import ordersService from "../../../services/orders.service";
import { useHistory } from "react-router-dom";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import OderItemsPage from "./orderItems";
import { setNestedObjectValues } from "formik";
import { RadioButton } from "primereact/radiobutton";
import { Tag } from "primereact/tag";
import { urlBackend } from "../../../http_common";
import { Image } from "primereact/image";
import showService from "../../../services/show.service";

const OdersPage = () => {
  let empty = {
    id: "",
    showIdEntity: "",
    sexEntity: "",
    nameDog: "",
    color: "",
    startPhoto1: null,
    startPhoto2: null,
    startPhoto3: null,
    startPhoto4: null,
    startPhoto5: null,
    startPhoto6: null,
    breed: "",
    classIdEntity: "",
    date: "",
    pedigree: "",
    chip: "",
    father: "",
    mather: "",
    adress: "",
    owner: "",
    breeder: "",
    phone: "",
    email: "",
    dateCreate: "",
    validateShowEntity: "",
  };
  //   const options = [
  //     { value: 1, label: "CAC-UA Червона калина" },
  //     { value: 2, label: "CACIB-FCI Бурштиновий кубок" },
  //   ];
  const [show, setshow] = useState(empty);

  const [selected, setSelected] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { list } = useSelector((state) => state.show);
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  //const [layout, setLayout] = useState("grid");
  const [expandedRows, setExpandedRows] = useState(null);
  // const [products, setProducts] = useState([]);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  //const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    try {
      dispatch(getShowList())
        .then(() => {
          setLoading(false);
        })
        .catch((ex) => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("Server is bad register from", error);
    }
  }, []);

  const statusCheck = (status) => {
    console.log("statusCheck", status);
    try {
      var dataStatus = {
        Id: status.id,
        StatusId: 2,
      };
      console.log("data", dataStatus);
      dispatch(chack_status(dataStatus))
        .then(() => {
          //setVisible(true);
          console.log("statusCheck!");
          history.push("/admin/oderlist");
        })
        .catch((ex) => {});
    } catch (error) {
      console.log("Server is bad ", error);
    }
  };

  const statusTrash = (status) => {
    console.log("statusTrash", status);
    try {
      var dataStatus = {
        Id: status.id,
        StatusId: 3,
      };
      console.log("data", dataStatus);
      dispatch(chack_status(dataStatus))
        .then(() => {
          //setVisible(true);
          console.log("statusTrash!");
          history.push("/admin/oderlist");
        })
        .catch((ex) => {});
    } catch (error) {
      console.log("Server is bad ", error);
    }
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };
  const confirmDeleteProduct = (show) => {
    const Productdel = show.id;
    console.log("Server is bad register from", Productdel);
    setshow(show);
    setDeleteProductDialog(true);
  };
  const deleteProduct = (show) => {
    console.log("del", show.id);
    //dispatch({type: DELL_PRODUCTS});
    showService
      .del_Show({ show })

      .then((result) => {
        console.log("del+++++++");
        setDeleteProductDialog(false);
        setshow(empty);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Продукт видалено",
          life: 2000,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Так"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => deleteProduct(show)}
      />
      <Button
        label="Ні"
        icon="pi pi-check"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
    </React.Fragment>
  );

  const listItems = (list) => {
    console.log("listItems", list.id);
    dispatch(push(`/admin/Oders/orderItems?id=${list.id}`));
    //setState({visible:true});
    setVisible(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-check"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => statusCheck(rowData)}
        />
        <Button
          icon="pi pi-exclamation-triangle"
          className="p-button-rounded p-button-danger"
          onClick={() => statusTrash(rowData)}
        />
      </React.Fragment>
    );
  };

  const actionBodyOdersItem = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-file-pdf"
          className="p-button-rounded p-button-help"
          onClick={() => listItems(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-secondary"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(list);

      console.log("worksheet", worksheet);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "orderProd");
    });
  };
  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data
          //"замовленя № " + number_orderProd_id + EXCEL_EXTENSION
        );
      }
    });
  };
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Панель керування заявками</h5>

      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Пошук..."
        />
      </span>
      <Button
        label="CAC"
        className="p-button-warning"
        severity="warning"
        outlined
      />
      <Button
        label="CACIB"
        className="p-button-help"
        severity="help"
        outlined
      />
      <Button
        type="button"
        icon="pi pi-file-excel"
        onClick={exportExcel}
        className="p-button-success mr-2"
        data-pr-tooltip="XLS"
      />
    </div>
  );
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.validateShowEntity}
        severity={getProductSeverity(rowData)}
      ></Tag>
    );
  };
  const getProductSeverity = (list) => {
    switch (list.validateShowEntity) {
      case "Погоджено":
        return "success";

      case "Нова заявка":
        return "warning";

      case "Відхилено":
        return "danger";

      default:
        return null;
    }
  };

  // const imageBodyTemplate = (rowData) => {
  //   console.log("foto", rowData);
  //   return (
  //     <img
  //       src={`${urlBackend}` + rowData.startPhoto1}
  //       //src={`http://localhost:5000` + rowData.image}
  //       onError={(e) =>
  //         (e.target.src =
  //           "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
  //       }
  //       alt={rowData.image}
  //       className="product-image"
  //     />
  //   );
  // };
  const allowExpansion = (data) => {
    //console.log("rowData", rowData);
    return data.length > 0;
  };
  const rowExpansionTemplate = (data) => {
    console.log("data111", data.id);
    return (
      <div className="p-3">
        {/* <h5>
          Фото для заяки {data.nameDog}, дата подання {data.dateCreate}
        </h5> */}
        <h5>Дата подання {data.dateCreate}</h5>
        <Image
          src={`${urlBackend}` + data.startPhoto1}
          alt="Image"
          preview
          width="100"
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          // alt={data.image}
          // className="product-image"
        />
        <Image
          src={`${urlBackend}` + data.startPhoto2}
          alt="Image"
          width="100"
          preview
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          // alt={data.image}
          // className="product-image"
        />
        <Image
          src={`${urlBackend}` + data.startPhoto3}
          alt="Image"
          width="100"
          preview
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          // alt={data.image}
          // className="product-image"
        />
        <Image
          src={`${urlBackend}` + data.startPhoto4}
          alt="Image"
          width="100"
          preview
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          // alt={data.image}
          // className="product-image"
        />
        <Image
          src={`${urlBackend}` + data.startPhoto5}
          alt="Image"
          width="100"
          preview
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          // alt={data.image}
          // className="product-image"
        />
        <Image
          src={`${urlBackend}` + data.startPhoto6}
          alt="Image"
          width="100"
          preview
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          // alt={data.image}
          // className="product-image"
        />
      </div>
    );
  };
  return (
    <>
      <Dialog
        // header='Dialog'
        visible={visible}
        style={{ width: "50vw" }}
        modal={true}
        onHide={() => setVisible(false)}
        maximizable={false}
      >
        {/* <h5 className="mx-0 my-1">Панель керування замовленями</h5> */}
        <OderItemsPage />
      </Dialog>
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Видаленя заявки"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {show && (
            <span>
              Ви впевнені, що хочети видалити заявку № <b>{show.id}</b>?
            </span>
          )}
        </div>
      </Dialog>
      ;
      {/* <Dialog visible={visible} onHide={setVisible(false)} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}>
            <OderItemsPage />
</Dialog> */}
      <div className="datatable-crud-demo">
        <Toast ref={toast} />

        <div className="card">
          <DataTable
            ref={dt}
            value={list}
            selection={selected}
            onSelectionChange={(e) => setSelected(e.value)}
            dataKey="id"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Відображено з {first} по {last} усього {totalRecords} замовлень"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
          >
            <Column expander={allowExpansion} style={{ width: "1rem" }} />
            <Column
              field="id"
              header="id"
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              field="classIdEntity"
              header="Клас"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="breed"
              header="Порода"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="color"
              header="Окрас"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="nameDog"
              header="Кличка"
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="sexEntity"
              header="Стать"
              sortable
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              field="date"
              header="Дата народженя"
              sortable
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              field="pedigree"
              header="№ родоводу"
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="chip"
              header="№ тату/чіп"
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="father"
              header="Батько"
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="mather"
              header="Мати"
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="breeder"
              header="Заводчик"
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="owner"
              header="Власник"
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="adress"
              header="Адреса"
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="phone"
              header="Телефон"
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="email"
              header="E-mail"
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              field="validateShowEntity"
              header="Статус заявки"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              header="Зміна статусу заявки"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              header="PDF/DEL"
              body={actionBodyOdersItem}
              exportable={false}
              style={{ minWidth: "1rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default OdersPage;
