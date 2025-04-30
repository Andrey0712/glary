import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import "./orderItems.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import logo from "../../../images/logoHeder.png";

const OderItemsPage = () => {
  // var url = new URL(window.location.href);
  // const oderId = url.searchParams.get("id");

  // console.log("Id order prod:", oderId);
  // const { list } = useSelector((res) => res.cac);
  // console.log("listItem:", list);
  // const number_orderProd = list.find((order) => order.id == oderId);
  // //const orderProd = list.find((order) => order.id == oderId).item;
  // //   const orderProd = [
  // //     list.map((element) => element.items.filter((item) => item.id !== oderId)),
  // //   ];
  // const number_orderProd_id = number_orderProd.id;
  // console.log("number_orderProd:", number_orderProd);
  // //console.log("order:", orderProd);
  // console.log("number_orderProd_id:", number_orderProd_id);
  // const [loader, setLoader] = useState(false);

  // const printRef = React.useRef(null);

  // const handleDownloadPdf = async () => {
  //   const element = printRef.current;
  //   if (!element) {
  //     return;
  //   }

  //   const canvas = await html2canvas(element, {
  //     scale: 2,
  //   });
  //   const data = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "px",
  //     format: "a4",
  //   });

  //   const imgProperties = pdf.getImageProperties(data);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();

  //   const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  //   pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("examplepdf.pdf");
  // };

  // return (
  //   <div className="wrapper">
  //     <div className="receipt-box">
  //       <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
  //         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
  //           <div ref={printRef} className="p-8 bg-white border border-gray-200">
  //             <div className="flex justify-between items-center mb-8">
  //               <div>
  //                 <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
  //                 <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
  //               </div>
  //               <div className="text-right">
  //                 <h2 className="font-semibold">Company Name</h2>
  //                 <p className="text-sm text-gray-600">
  //                   123 Business Street
  //                   <br />
  //                   City, State 12345
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="mb-8">
  //               <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
  //               <p className="text-gray-700">
  //                 Client Name
  //                 <br />
  //                 Client Address
  //                 <br />
  //                 City, State ZIP
  //               </p>
  //             </div>

  //             <table className="w-full mb-8 border-collapse">
  //               <thead>
  //                 <tr className="bg-gray-100">
  //                   <th className="border p-2 text-left">Description</th>
  //                   <th className="border p-2 text-right">Quantity</th>
  //                   <th className="border p-2 text-right">Unit Price</th>
  //                   <th className="border p-2 text-right">Total</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td className="border p-2">Web Design Service</td>
  //                   <td className="border p-2 text-right">1</td>
  //                   <td className="border p-2 text-right">$1,500.00</td>
  //                   <td className="border p-2 text-right">$1,500.00</td>
  //                 </tr>
  //                 <tr>
  //                   <td className="border p-2">Hosting Setup</td>
  //                   <td className="border p-2 text-right">1</td>
  //                   <td className="border p-2 text-right">$250.00</td>
  //                   <td className="border p-2 text-right">$250.00</td>
  //                 </tr>
  //               </tbody>
  //             </table>

  //             <div className="flex justify-end">
  //               <div className="w-64">
  //                 <div className="flex justify-between mb-2">
  //                   <span>Subtotal:</span>
  //                   <span>$1,750.00</span>
  //                 </div>
  //                 <div className="flex justify-between mb-2">
  //                   <span>Tax (10%):</span>
  //                   <span>$175.00</span>
  //                 </div>
  //                 <div className="flex justify-between font-bold text-lg">
  //                   <span>Total:</span>
  //                   <span>$1,925.00</span>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="receipt-actions-div">
  //             <div className="actions-right">
  //               <button
  //                 className="receipt-modal-download-button"
  //                 onClick={handleDownloadPdf}
  //                 disabled={!(loader === false)}
  //               >
  //                 {loader ? <span>Downloading</span> : <span>Download</span>}
  //               </button>
  //             </div>
  //           </div>
  //           {/* <div className="mt-6 flex justify-center">
  //         <button
  //           onClick={handleDownloadPdf}
  //           className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
  //         >
  //           Download PDF
  //         </button>
  //       </div> */}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  var url = new URL(window.location.href);
  const oderId = url.searchParams.get("id");

  console.log("Id order prod:", oderId);
  const { list } = useSelector((res) => res.show);
  console.log("listItem:", list);
  const application = list.find((order) => order.id == oderId);
  //const orderProd = list.find((order) => order.id == oderId).item;
  //   const orderProd = [
  //     list.map((element) => element.items.filter((item) => item.id !== oderId)),
  //   ];
  const number_orderProd_id = application.id;
  console.log("number_orderProd:", application);
  //console.log("order:", orderProd);
  console.log("number_orderProd_id:", number_orderProd_id);
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt" + number_orderProd_id + ".pdf");
    });
  };

  // const header = (
  //   <div className="table-header">
  //     <h1 className="text-center">Заявка № {number_orderProd.id}</h1>
  //     <Button
  //       // <div className="receipt-actions-div">
  //       //   <div className="actions-right">
  //       //     <button
  //       //       className="receipt-modal-download-button"
  //       //       onClick={downloadPDF}
  //       //       disabled={!(loader === false)}
  //       //     >
  //       //       {loader ? <span>Downloading</span> : <span>Download</span>}
  //       //     </button>
  //       //   </div>
  //       // </div>
  //       type="button"
  //       icon="pi pi-file-excel"
  //       //onClick={exportExcel}
  //       onClick={downloadPDF}
  //       className="p-button-success mr-2"
  //       data-pr-tooltip="XLS"
  //     />
  //   </div>
  //);

  return (
    <div className="wrapper">
      <div className="receipt-box">
        {/* actual receipt */}
        <div className="actual-receipt">
          <h6>
            FEDERATION CYNOLOGIQUE INTERNATIONAL (FCI) UKRAINIAN KENNEL UNION
            (UKU)
          </h6>
          <div className="data-row">
            <div className="receipt-organization-logo">
              <img alt="logo" src={logo} />
            </div>
            {/* <span className="font-weight">{number_orderProd.id}</span> */}
            <h5>
              {application.showIdEntity}
              {/* 13.07.2019 CAC -UA "Червона калина" монопородні виставки: КЧК
              німецька вівчарка, лабрадор ретривер */}
            </h5>
          </div>
          {/* 
          
          <h6>ABC вулиця 123</h6>

          
          <h6>Karachi Sindh 75050</h6>

          
          <div className="phone-and-website">
            <p>
              <a href={`mailto:anwarhamza919@gmail.com`}>
                anwarhamza919@gmail.com
              </a>
            </p>
            <p>01234567890</p>

            <p>
              <a href="https://www.youtube.com/@jsSolutions" target="blank">
                https://www.youtube.com/@jsSolutions
              </a>
            </p>
          </div> 
          */}

          <div className="colored-row">
            <h6>
              При реєстрації собаки на виставку, обов'язковими є три пункти:
            </h6>
            <span>1. Заповнений лист-заявка</span>
            <span>2. Чітка копія родоводу собаки.</span>
            <span>
              При реєстрації в робочий клас або в клас чемпіонів необхідно
              додати ксерокопії відповідних сертифікатів.
            </span>
            <span>3. Ксерокопія квитанції про оплату.</span>
            <span>
              Заявка вважається прийнятою тільки після підтвердження отримання
            </span>
            <h6>Для участі в конкурсах зяповнються окремі заявки.</h6>
            <span>Заявочний лист зяповнюєтся на мові оригіналу родоводу</span>
            <span>
              Please, attach copy of dog’s pedigree and reciept of entry
              payment. Registration form is not accepted without pedigree.
              Enclose recognized certificate for entering Working or Champion
              classes
            </span>{" "}
            <hr />
            <div className="phone-and-website">
              <p>Реєстрація не повертається! Заміни та переноси 100 грн</p>
              <p>Адреса прийому заявки:</p>
              <p>
                {/* <a href={`mailto:rivne_dog_show@ukr.net`}> */}
                e-mail: rivne_dog_show@ukr.net
                {/* </a> */}
              </p>
              <p>(050)9131774,(067)3627255, (096)6229227</p>
            </div>{" "}
            <hr />
            <span>
              Організатори виставки залишають за собою право переводу собаки у
              відкритий клас, якщо поданих сертифікатів буде недостатньо або
              сертифікати не відповідают вимогам FCI. Якщо у собаки ще не
              виготовлений родовід, прикладіть копію цуценячої карточки та у
              відповідному полі вкажіть її №!
            </span>{" "}
          </div>
          {/* <div className="tblFirst "> */}
          <table border="0">
            <caption></caption>
            <tbody>
              <tr>
                <td className="border p-0">Класс</td>
                <td className="border p-0 text-right">
                  {application.classIdEntity}
                </td>
                <td className="border p-0 text-right">Стать</td>
                <td className="border p-0 text-right">
                  {application.sexEntity}
                </td>
              </tr>
              <tr>
                <td className="border p-0">Порода</td>
                <td className="border p-0 text-right">{application.breed}</td>
                <td className="border p-0 text-right">Дата народженя</td>
                <td className="border p-0 text-right">{application.date}</td>
              </tr>
              <tr>
                <td className="border p-0">Кличка собаки</td>
                <td className="border p-0 text-right">{application.nameDog}</td>
                <td className="border p-0 text-right">Окрас</td>
                <td className="border p-0 text-right">{application.color}</td>
              </tr>
              <tr>
                <td className="border p-0">Номер родоводу</td>
                <td className="border p-0 text-right">
                  {application.pedigree}
                </td>
                <td className="border p-0 text-right">Чіп або тату</td>
                <td className="border p-0 text-right">{application.chip}</td>
              </tr>
              <tr>
                <td className="border p-0">Батько</td>
                <td className="border p-0 text-right col-md-6" colspan="4">
                  {application.father}
                </td>
              </tr>
              <tr>
                <td className="border p-0">Мати</td>
                <td className="border p-0 text-right col-md-6" colspan="4">
                  {application.mather}
                </td>
              </tr>
              <tr>
                <td className="border p-0 col-md-2">Власник</td>
                <td className="border p-0 text-right">{application.owner}</td>
                <td className="border p-0">Заводчик</td>
                <td className="border p-0 text-right">{application.breeder}</td>
              </tr>
              <tr>
                <td className="border p-0">Адреса</td>
                <td className="border p-0 text-right">{application.adress}</td>
                <td className="border p-0">Телефон</td>
                <td className="border p-0 text-right">{application.phone}</td>
              </tr>
              <tr>
                <td className="border p-0">E-mail</td>
                <td className="border p-0 text-right ">{application.email}</td>
                <td className="border p-0">Дата реєстрациї</td>
                <td className="border p-0 text-right">
                  {application.dateCreate}
                </td>
              </tr>
            </tbody>
          </table>
          {/* </div> */}

          <table border="0">
            <caption></caption>
            <tbody>
              <tr>
                <td className="border p-0 col-md-3">&nbsp;</td>
                <td className="border p-0" colspan="3">
                  -01.02.19
                </td>
                <td className="border p-0" colspan="3">
                  По 31.03.19
                </td>
                <td className="border p-0" colspan="3">
                  По 31.05.19
                </td>
                <td className="border p-0" colspan="3">
                  По 31.06.19
                </td>
              </tr>
              <tr>
                <td className="border p-0 col-md-3">&nbsp;</td>
                <td className="border p-0">CAC</td>
                <td className="border p-0">CACIB</td>
                <td className="border p-0">MONO</td>
                <td className="border p-0">CAC</td>
                <td className="border p-0">CACIB</td>
                <td className="border p-0">MONO</td>
                <td className="border p-0">CAC</td>
                <td className="border p-0">CACIB</td>
                <td className="border p-0">MONO</td>
                <td className="border p-0">CAC</td>
                <td className="border p-0">CACIB</td>
                <td className="border p-0">MONO</td>
              </tr>
              <tr>
                <td className="border p-0">За першу собаку</td>
                <td className="border p-0">400</td>
                <td className="border p-0">500</td>
                <td className="border p-0">400</td>
                <td className="border p-0">500</td>
                <td className="border p-0">600</td>
                <td className="border p-0">500</td>
                <td className="border p-0">550</td>
                <td className="border p-0">700</td>
                <td className="border p-0">500</td>
                <td className="border p-0">600</td>
                <td className="border p-0">750</td>
                <td className="border p-0">500</td>
              </tr>
              <tr>
                <td className="border p-0">За кожну наступну</td>
                <td className="border p-0">400</td>
                <td className="border p-0">500</td>
                <td className="border p-0">400</td>
                <td className="border p-0">450</td>
                <td className="border p-0">550</td>
                <td className="border p-0">450</td>
                <td className="border p-0">500</td>
                <td className="border p-0">650</td>
                <td className="border p-0">500</td>
                <td className="border p-0">550</td>
                <td className="border p-0">700</td>
                <td className="border p-0">500</td>
              </tr>
              <tr>
                <td className="border p-0">Бебі, цуценята</td>
                <td className="border p-0">---</td>
                <td className="border p-0">---</td>
                <td className="border p-0">---</td>
                <td className="border p-0">250</td>
                <td className="border p-0">250</td>
                <td className="border p-0">250</td>
                <td className="border p-0">300</td>
                <td className="border p-0">300</td>
                <td className="border p-0">300</td>
                <td className="border p-0">300</td>
                <td className="border p-0">300</td>
                <td className="border p-0">300</td>
              </tr>
              <tr>
                <td className="border p-0">Ветерани</td>
                <td className="border p-0" colspan="12">
                  200 на протязі всієї реєстрациї
                </td>
              </tr>
              <tr>
                <td className="border p-0">
                  Конкурси: племіна група/пара/плідник
                </td>
                <td className="border p-0">300</td>
                <td className="border p-0">400</td>
                <td className="border p-0">300</td>
                <td className="border p-0">300</td>
                <td className="border p-0">400</td>
                <td className="border p-0">300</td>
                <td className="border p-0">300</td>
                <td className="border p-0">400</td>
                <td className="border p-0">300</td>
                <td className="border p-0">300</td>
                <td className="border p-0">400</td>
                <td className="border p-0">300</td>
              </tr>
            </tbody>
          </table>

          <table border="0">
            <tbody>
              <tr>
                <td className="border p-0" rowspan="2">
                  For foreigners
                </td>
                <td className="border p-0">UA-CAC</td>
                <td className="border p-0">
                  30 Euro (25 Euro for next dog), baby,puppy,veteran - 10 euro,
                  competitions - 15 euro
                </td>
              </tr>
              <tr>
                <td className="border p-0">FCI-CACIB</td>
                <td className="border p-0">
                  40 Euro (35 Euro for next dog), baby,puppy,veteran - 15 euro,
                  competitions -20 euro
                </td>
              </tr>
              <tr>
                <td className="border p-0" colspan="2">
                  Реквізити для оплати
                </td>

                <td className="border p-0">
                  {" "}
                  Отримувач: Рівненський MO КСУ «Альянс» Код: 37511860 P/pax:
                  26002060482627 МФО: 333391 КБ «Приватбанк» Оплата в гон.
                  Призначення плутежу: ЦІЛЬОВИЙ ДОБРОВІЛЬНИЙ ВНЕСОК ЗА УЧАСТЬ У
                  ВИСТАВЦІ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* end of actual receipt */}

        {/* receipt action */}
        <div className="receipt-actions-div">
          <div className="actions-right">
            <button
              className="receipt-modal-download-button"
              onClick={downloadPDF}
              disabled={!(loader === false)}
            >
              {loader ? <span>Downloading</span> : <span>Download</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="datatable-crud-demo">
  //     <div className="card">
  //       <DataTable
  //         value={number_orderProd}
  //         dataKey="id"
  //         header={header}
  //         responsiveLayout="scroll"
  //       >
  //         <Column field="id" header="id" style={{ minWidth: "1rem" }}></Column>
  //         <Column
  //           field="classIdEntity"
  //           header="Клас"
  //           sortable
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="breed"
  //           header="Порода"
  //           sortable
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="color"
  //           header="Окрас"
  //           sortable
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="nameDog"
  //           header="Кличка"
  //           sortable
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="sexEntity"
  //           header="Стать"
  //           sortable
  //           style={{ minWidth: "1rem" }}
  //         ></Column>
  //         <Column
  //           field="date"
  //           header="Дата народженя"
  //           sortable
  //           style={{ minWidth: "1rem" }}
  //         ></Column>
  //         <Column
  //           field="pedigree"
  //           header="№ родоводу"
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="chip"
  //           header="№ тату/чіп"
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="father"
  //           header="Батько"
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="mather"
  //           header="Мати"
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="breeder"
  //           header="Заводчик"
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="owner"
  //           header="Власник"
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="adress"
  //           header="Адреса"
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="phone"
  //           header="Телефон"
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //         <Column
  //           field="email"
  //           header="E-mail"
  //           style={{ minWidth: "2rem" }}
  //         ></Column>
  //       </DataTable>
  //     </div>
  //   </div>
  // );

  //     return (

  //         <div className="row">
  //            <div className="offset-md-2 col-md-6">
  //            <br/>
  //                <h1 className="text-center" >Товарні позиції замовленя № {orderProd.id}</h1>

  //                 {/* <Tooltip target=".export-buttons>button" position="bottom" /> */}

  //            {

  //                <table className="table">
  //                <thead className="table table-bordered">
  //                    <tr>
  //                    {/* <th scope="col">ID</th> */}
  //                        <th scope="col">Id</th>
  //                        {/* <th scope="col">Name</th>
  //                        <th scope="col">Price</th>
  //                        <th scope="col">Quantity</th> */}

  //                    </tr>
  //                </thead>

  //                 <tbody>
  //                    {
  //                  this.orderProd.map((item) =>
  //                        <tr key={item.productId}>
  //                           {/* <td>{item.productId}</td> */}

  //                            <td>{item.productId}</td>
  //                            {/* <td> {item.buyPrice} грн.</td>
  //                            <td> {item.quantity} </td>
  //                            <td> {item.productName} грн. </td> */}

  //                        </tr>)
  //                        }

  //                </tbody>

  //            </table>
  //            }

  //            </div>
  //            </div>

  //    );
};

export default OderItemsPage;
