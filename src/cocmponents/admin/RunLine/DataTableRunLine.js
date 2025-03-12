import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./DataTableUser.css";
import { push } from "connected-react-router";
import { getRunLine } from "../../../actions/runLine";
import runlineService from "../../../services/runLine.service";

const RunLinePage = () => {
  let empty = {
    id: "",
    description: "",
  };

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [runLine, setRunLine] = useState(empty);
  const [selected, setSelected] = useState(null);

  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { list } = useSelector((state) => state.runLine);

  useEffect(() => {
    try {
      dispatch(getRunLine())
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

  const hideDeleteDialog = () => {
    setDeleteDialog(false);
  };

  //   const editProduct = (product) => {
  //     console.log("edit", product);
  //     dispatch(push(`/admin/EditProduct?id=${product.id}`));
  //   };

  const confirmDelete = (runLine) => {
    //const Productdel=product.id;
    //console.log("Server is bad register from", Productdel);
    setRunLine(runLine);
    setDeleteDialog(true);
  };

  const deleteUser = (runLine) => {
    console.log("del+++++++", runLine.id);
    runlineService
      .del_RunLine({ runLine })
      .then((result) => {
        console.log("del+++++++");
        setDeleteDialog(false);
        setRunLine(empty);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "runLine видалено",
          life: 2000,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        /> */}
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDelete(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Панель керування runLine</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Пошук..."
        />
      </span>
    </div>
  );

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Так"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => deleteUser(runLine)}
      />
      <Button
        label="Ні"
        icon="pi pi-check"
        className="p-button-text"
        onClick={hideDeleteDialog}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        {/* <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar> */}

        <DataTable
          ref={dt}
          value={list}
          selection={selected}
          onSelectionChange={(e) => setSelected(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Відображено з {first} по {last} всього {totalRecords} користувачів"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            field="description"
            header="Text"
            style={{ minWidth: "8rem" }}
          ></Column>

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={deleteDialog}
        style={{ width: "450px" }}
        header="Видаленя runLine"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {runLine && (
            <span>
              Ви впевнені, що хочети видалити <b>{runLine.description}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default RunLinePage;
