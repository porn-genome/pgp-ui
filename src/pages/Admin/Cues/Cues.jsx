import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CuesInsertForm from './CuesInsertForm';
import SearchableTable from '../../../components/SearchableTable/SearchableTable';
import { EditableCell, EditableRow } from '../../../components/Editable';
import { CUE_ID_FIELD, CUE_NAME_FIELD } from '../../../assets/constants/Constants';
import { getCues, insertCues, editCue } from '../../../services/api/cue';
import './Cues.less';

const Cues = () => {
  // Cue format expected: { id: 1, cueText: 'Cue 1', isActive: true }
  const [cues, setCues] = useState([]);

  useEffect(() => {
    getCues().then((response) => setCues(response));
  }, []);

  const updateCue = (record, newValue, updatedField) => {
    editCue({ ...record, [updatedField]: newValue[updatedField] }).then(() => {
      setCues(
          cues.map((cue) =>
              cue[CUE_ID_FIELD] === record[CUE_ID_FIELD] ?
                  { ...record, [updatedField]: newValue[updatedField] } :
                  cue,
          ));
    });
  };

  const addCues = (newCues) => {
    insertCues(newCues).then((addedCues) => {
      setCues((currCues) => [...addedCues, ...currCues]);
    });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const getEditSearchProps = () => ({
    onCell: (record) => ({
      record,
      editable: true,
      dataIndex: CUE_NAME_FIELD,
      iconColour: '#bfbfbf',
      title: 'Cue Name',
      handleSave: updateCue,
    }),
  });

  return (
    <Row className="cue-page">
      <Col xs={{ offset: 2, span: 20 }} md={{ offset: 3, span: 18 }}>
        <CuesInsertForm addCues={addCues}/>
        <SearchableTable
          title='Cue Name'
          dataSource={cues}
          searchIndex={CUE_NAME_FIELD}
          columnProps={getEditSearchProps()}
          textColour='#bfbfbf'
          size='small'
          pagination={{ pageSize: 16 }}
          rowKey={CUE_ID_FIELD}
          components={components}
        />
      </Col>
    </Row>
  );
};

export default Cues;
