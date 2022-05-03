import React from "react";
import "./component.css";

function Table({ heading, data }) {
  const convertTitleCase = (str) => {
    str = str.split(" ");
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  };

  return (
    <>
      {data.length ? (
        <table className="Table-Data">
          <tbody>
            <tr>
              {heading.length
                ? heading.map((column) => {
                    return <th key={column}>{convertTitleCase(column)}</th>;
                  })
                : null}
            </tr>

            {data.length
              ? data.map((row) => {
                  return (
                    <tr key={row.orderId}>
                      <td>{row.orderId}</td>
                      <td>{row.customerId}</td>
                      <td>{row.deliveryPincode}</td>
                      <td>{row.orderDate}</td>
                      <td style={{ display: "flex", flexDirection: "column" }}>
                        {row.items
                          ? row.items.map((item, index) => {
                              return <div key={index}>{item}</div>;
                            })
                          : null}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          No Data Found
        </div>
      )}
    </>
  );
}

export default React.memo(Table);
