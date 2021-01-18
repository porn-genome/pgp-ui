import React from 'react';
import { Row, Col, Input, Button, Form } from 'antd';
import './CuesInsertForm.css';
import { CUE_SEPARATOR } from '../../../assets/constants/Constants';

const CuesInsertForm = ({ addCues }) => {
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.validateFields()
        .then((fields) => {
          const newCues = new Set(fields['cues'].split(CUE_SEPARATOR).filter((cue) => cue !== ''));
          addCues(newCues);
        }).then(() => form.resetFields());
  };

  return (
    <Form form={form} onFinish={handleAdd}>
      <Row>
        <Col xs={19} lg={20}>
          <Form.Item name="cues"
            rules={[{ required: true, message: 'Cues field cannot be empty' }]}>
            <Input className="add-cue-input"
              placeholder={`Enter a list of ${CUE_SEPARATOR} separated cues...`}
            />
          </Form.Item>
        </Col>

        <Col xs={{ offset: 1, span: 4 }} lg={{ span: 3 }}>
          <Form.Item>
            <Button className="add-button" type='primary' htmlType="submit">Add</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CuesInsertForm;
