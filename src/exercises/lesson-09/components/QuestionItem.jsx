import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component
export function QuestionItem({ question }) {
  const [workingText, setWorkingText] = useState(question.question);
  const [workingOptions, setWorkingOptions] = useState(question.options || []);

  const { state, dispatch } = useContext(SurveyContext);
  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // Edit / Cancel
  const handleEdit = () => {
    if (!isEditing) {
      setWorkingText(question.question);
      setWorkingOptions(question.options || []);
    }

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: isEditing ? null : question.id,
      },
    });
  };

  // Save question text
  const handleSave = () => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: {
        id: question.id,
        newText: workingText,
      },
    });

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: null,
      },
    });
  };

  // Delete question
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: {
          id: question.id,
        },
      });
    }
  };

  // Add option
  const handleAddOption = () => {
    const optionText = window.prompt('Enter a new option:');

    if (optionText && optionText.trim()) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: {
          questionId: question.id,
          optionText: optionText.trim(),
        },
      });

      setWorkingOptions([...workingOptions, optionText.trim()]);
    }
  };

  // Save option
  const handleSaveOption = (index) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: workingOptions[index],
      },
    });
  };

  // Delete option
  const handleDeleteOption = (index) => {
    if (question.options.length > 2) {
      dispatch({
        type: 'DELETE_OPTION_FROM_QUESTION',
        payload: {
          questionId: question.id,
          optionIndex: index,
        },
      });

      const newOptions = workingOptions.filter(
        (_, optionIndex) => optionIndex !== index
      );

      setWorkingOptions(newOptions);
    }
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>

        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className={styles['question-content']}>
          <input
            type="text"
            value={workingText}
            onChange={(e) => setWorkingText(e.target.value)}
          />

          <button onClick={handleSave}>Save</button>

          <button
            onClick={() =>
              dispatch({
                type: 'SET_EDITING_QUESTION',
                payload: { questionId: null },
              })
            }
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles['question-content']}>
          <h3>{question.question}</h3>
        </div>
      )}

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>

          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={workingOptions[index] || ''}
                      onChange={(e) => {
                        const newOptions = [...workingOptions];
                        newOptions[index] = e.target.value;
                        setWorkingOptions(newOptions);
                      }}
                    />

                    <button onClick={() => handleSaveOption(index)}>
                      Save
                    </button>

                    <button
                      onClick={() => handleDeleteOption(index)}
                      disabled={question.options.length <= 2}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <span className={styles['option-text']}>{option}</span>
                )}
              </li>
            ))}
          </ul>

          {isEditing && <button onClick={handleAddOption}>+ Add Option</button>}
        </div>
      )}
    </div>
  );
}
