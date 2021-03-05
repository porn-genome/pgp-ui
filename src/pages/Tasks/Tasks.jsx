import React, { useEffect, useState } from 'react';
import Task from './Task/Task';
import { Col, Popover, Row } from 'antd';
import './Tasks.less';
import {
  QUESTION_COUNT, TASK_TYPE_DESCRIPTION_IDENTIFICATION,
  TASK_TYPE_DESCRIPTION_VERIFICATION,
  TASK_TYPE_VERIFICATION,
} from '../../assets/constants/Constants';
import TaskInstructions from './TaskInstructions/TaskInstructions';
import { InfoCircleFilled } from '@ant-design/icons';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [nextTasks, setNextTasks] = useState([]);
  const mockData = [
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'Can you see cats in this picture?' },
    { image: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png', type: 'V', question: 'Can you see flowers in this picture?' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'I', question: 'Please identify 5 different things that you can see in this picture.' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'Can you see peppers in this picture?' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'Can you see carrots in this picture?' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'I', question: 'SET 1: Question7: Enter 5 of your favourite food' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'SET 1: Question8: is there a dog in this image?' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'I', question: 'SET 1: Question9: Enter 5 of your favourite fruits' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'SET 1: Question10: is there a giraffe in this image?' },
  ];

  const newTasks = [
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'SET 2: Question1: is there a cat in this image?' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'I', question: 'SET 2: Question2: Enter 5 of your favourite food' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'SET 2: Question3: is there a dog in this image?' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'I', question: 'SET 2: Question4: Enter 5 of your favourite fruits' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'SET 2: Question5: is there a giraffe in this image?' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'SET 2: Question6: is there a cat in this image?' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'I', question: 'SET 2: Question7: Enter 5 of your favourite food' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'SET 2: Question8: is there a dog in this image?' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'I', question: 'SET 2: Question9: Enter 5 of your favourite fruits' },
    { image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/variety_of_bell_peppers_other/1800x1200_variety_of_bell_peppers_other.jpg', type: 'V', question: 'SET 2: Question10: is there a giraffe in this image?' }];

  useEffect(() => {
    // make service call
    setTasks(mockData);
  }, []);

  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const [currentTaskNumber, setCurrentTaskNumber] = useState(0);
  const incrementTaskNumber = () => {
    setCurrentTaskNumber((taskNumber) => {
      if (taskNumber + 1 === QUESTION_COUNT) {
        setTasks(nextTasks);
        setNextTasks([]);
        return 0;
      }

      // if already answered half of the questions,
      // make an API call and have the second second of questions ready
      if (taskNumber === QUESTION_COUNT / 2) {
        setNextTasks(newTasks);
      }

      return taskNumber + 1;
    });
  };

  const getCurrentTask = () => {
    return tasks[currentTaskNumber] || '';
  };

  const getTaskTypeDescription = () => {
    return getCurrentTask()['type'] === TASK_TYPE_VERIFICATION ?
        TASK_TYPE_DESCRIPTION_VERIFICATION :
        TASK_TYPE_DESCRIPTION_IDENTIFICATION;
  };

  const getCompletedTaskStatus = () => {
    return completedTaskCount === 1 ?
        `1 Question Completed` :
        `${completedTaskCount} Questions Completed`;
  };

  const handleSubmit = () => {
    setCompletedTaskCount((currentNumber) => currentNumber + 1);
    incrementTaskNumber();
    submitResult();
  };

  // eslint-disable-next-line no-unused-vars
  const submitResult = () => {
    console.log('should submit result here!');
  };

  return (
    <div className="tasks-page">
      <Col
        className="tasks-main-container"
        xs={{ offset: 1, span: 22 }} sm={{ offset: 3, span: 18 }}>
        <div className="question-container">

          <Col xs={0} md={9} lg={7} xxl={6} className="side-instructions-container">
            <TaskInstructions taskType={getCurrentTask()['type']}/>
          </Col>

          <Col xs={24} md={15} lg={17} xll={18} className="task-container">
            <Row className="task-header">
              <Col className="task-type-container">
                <h6>{getTaskTypeDescription()}</h6>
                <Col md={0}>
                  <Popover content={<TaskInstructions/>} trigger="click">
                    <InfoCircleFilled id="info-icon"/>
                  </Popover>
                </Col>
              </Col>
              <Col className="progress-text">{getCompletedTaskStatus()}</Col>
            </Row>

            <Task task={getCurrentTask()} handleSubmit={handleSubmit}/>

            <Row className="skip-btn-container">
              <button className="btn skip-btn" onClick={incrementTaskNumber}>Skip</button>
            </Row>
          </Col>
        </div>
      </Col>
    </div>
  );
};

export default Tasks;
