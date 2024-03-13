import React, { useState } from "react";
import styles from "./AccordionTable.module.css";
import Loading from "../Loading/Loading";
import { exhibitionDateFormat, neverNull } from "../Helper";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "../Forms/Button";
import { MdModeEdit } from "react-icons/md";
import { EnToPtStatus, hiring_status } from "../Consts";

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
  setOpenEditModal?: any;
  setCurrentData?: any;
  currentData?: any;
  currentPublicDefense?: any;
  setCurrentPublicDefense?: any;
  setCurrentId?: any;
}

export const AccordionTable: React.FC<AccordionTableProps> = ({
  title,
  columns,
  data,
  isEmpty,
  loading,
  error,
  setOpenEditModal,
  setCurrentData,
  currentData,
  currentPublicDefense,
  setCurrentPublicDefense,
  setCurrentId,
}) => {
  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.stopPropagation();
    setOpenEditModal(true);
    setCurrentData(index);

    const selectedDefense = data[index]?.public_defense.find(
      (defense: any, defenseIndex: number) =>
        defense.registration ===
        data[index]?.public_defense[defenseIndex].registration
    );
    if (selectedDefense) {
      setCurrentId(selectedDefense?.id);
    }
  };

  const handlePublicDefense = (row: any, index: number) => {
    const selectedDefense = data[currentData]?.public_defense.filter(
      (defense: any) => {
        return (
          defense.registration ===
          data[currentData]?.public_defense[index]?.registration
        );
      }
    );
    if (selectedDefense && selectedDefense.length > 0) {
      setCurrentId(selectedDefense[0].id);
    }
    const rowIndex = data.findIndex(
      (defense: any) => defense.name === row?.name
    );
    if (rowIndex !== -1) {
      setCurrentData(rowIndex);
    }
    setCurrentPublicDefense((prev: any) => ({
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
                            column.property === "public_defense" ||
                            column.property === "registration" ||
                            column.property === "interview_index" ||
                            column.property === "category" ? (
                              neverNull(
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
                            ) : column.property === "hiring_status" ? (
                              EnToPtStatus[
                                row?.public_defense[
                                  currentPublicDefense[
                                    row?.name?.replace(/ /g, "")
                                  ]
                                    ? currentPublicDefense[
                                        row?.name?.replace(/ /g, "")
                                      ]
                                    : 0
                                ]?.[
                                  column.property
                                ] as keyof typeof EnToPtStatus
                              ]
                            ) : column.property === "birth_date" ? (
                              exhibitionDateFormat(row[column.property])
                            ) : column.property === "edit" ? (
                              <MdModeEdit
                                size={24}
                                onClick={(e: any) => handleEdit(e, rowIndex)}
                              />
                            ) : (
                              neverNull(row[column.property])
                            )}
                          </div>
                        ))}
                      </AccordionSummary>
                      <AccordionDetails>
                        <h3>Núcleos</h3>
                        {row.public_defense?.map((item: any, index: number) => (
                          <p
                            onClick={() => handlePublicDefense(row, index)}
                            key={index}
                            style={{ cursor: "pointer" }}
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
