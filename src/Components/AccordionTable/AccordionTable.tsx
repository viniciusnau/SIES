import React, { useState } from "react";
import styles from "./AccordionTable.module.css";
import Loading from "../Loading/Loading";
import { neverNull } from "../Helper";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

interface iCurrentPublicDefense {
  [name: string]: string;
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

  const handlePublicDefense = (name: string, rowData: any) => {
    const { public_defense } = rowData;
    setCurrentPublicDefense((prev) => ({
      ...prev,
      [name]: public_defense,
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
                            {row[column.property] === "public_defense"
                              ? neverNull(
                                  row?.public_defense.filter((item: any) => {
                                    return (
                                      item.public_defense ===
                                      currentPublicDefense[row.name]
                                    );
                                  })?.[column.property]
                                )
                              : neverNull(row[column.property])}
                          </div>
                        ))}
                      </AccordionSummary>
                      <AccordionDetails>
                        <h3>Defensorias públicas</h3>
                        {row.public_defense?.map((item: any, index: number) => (
                          <p
                            onClick={() => handlePublicDefense(row.name, item)}
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
