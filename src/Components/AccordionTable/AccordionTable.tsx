import React, { useState } from "react";
import styles from "./AccordionTable.module.css";
import Loading from "../Loading/Loading";
import { neverNull } from "../Helper";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

interface iCurrentPublicDefense {
  [name: string]: number;
}

interface Column {
  title: string;
  property: string;
}

interface AccordionTableProps {
  title?: string;
  columns: Column[];
  data: any[];
  isEmpty?: boolean;
  loading?: boolean;
  error?: boolean;
}

export const AccordionTable: React.FC<AccordionTableProps> = ({
  title,
  columns,
  data,
  isEmpty,
  loading,
  error,
}) => {
  const [currentPublicDefense, setCurrentPublicDefense] =
    useState<iCurrentPublicDefense>({});

  const handlePublicDefense = (rowData: any, row: any, index: number) => {
    const { public_defense } = rowData;
    console.log("row: ", row);
    setCurrentPublicDefense((prev) => ({
      ...prev,
      [row?.name?.replace(/ /g, "")]: index,
    }));
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        {title && <div className={styles.headerTable}>{title}</div>}
      </div>
      <div className={styles.container}>
        <div className={styles.tableHeader}>
          {columns.map((column, index) => (
            <div key={index} className={styles.columnHeader}>
              <div className={styles.columnTitle}>{column.title}</div>
            </div>
          ))}
        </div>
        <div className={styles.tableBody}>
          {loading ? (
            <div style={{ marginBottom: "3rem" }}>
              <Loading size="4rem" type="spin" />
            </div>
          ) : (
            <>
              {isEmpty || error ? (
                <div className={styles.empty}>
                  {isEmpty
                    ? "Não foi encontrado nenhum conteúdo!"
                    : "Não foi possível carregar as informações!"}
                </div>
              ) : (
                <>
                  {data?.map((row, rowIndex) => (
                    <Accordion className={styles.tableRow} key={rowIndex}>
                      <AccordionSummary
                        id="panel-header"
                        aria-controls="panel-content"
                        className={styles.containerRow}
                      >
                        {columns.map((column, index) => (
                          <div key={index} className={styles.row}>
                            {column.property === "average" ||
                            column.property === "test_index" ||
                            column.property === "hiring_status" ||
                            column.property === "category"
                              ? neverNull(
                                  row?.public_defense[
                                    currentPublicDefense[
                                      row?.name?.replace(/ /g, "")
                                    ]
                                      ? currentPublicDefense[
                                          row?.name?.replace(/ /g, "")
                                        ]
                                      : 0
                                  ]?.[column.property]
                                )
                              : neverNull(row[column.property])}
                          </div>
                        ))}
                      </AccordionSummary>
                      <AccordionDetails>
                        <h3>Defensorias públicas</h3>
                        {row.public_defense?.map((item: any, index: number) => (
                          <p
                            onClick={() =>
                              handlePublicDefense(item, row, index)
                            }
                            key={index}
                          >
                            {item.public_defense}
                          </p>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
