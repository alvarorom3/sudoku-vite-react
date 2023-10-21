import { nanoid } from 'nanoid';
import { findSubgridStartingIndex } from '../../utils/sudokuInputOperations';
import './index.css';


export default function SudokuTable({ sudokuArray, handleCellClick, selectedCell, errorCell, tableRef }) {

    function isSelected(selectedCell, rowIndex, colIndex) {
        if (selectedCell) {
            return selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? 'selected' : ''
        }
        return false
    }

    function sameSubGrid(selectedCell, rowIndex, colIndex) {
        if (selectedCell) {
            const { subgridRowIndex, subgridColIndex } = findSubgridStartingIndex(selectedCell.rowIndex, selectedCell.colIndex);

            const testRow = rowIndex >= subgridRowIndex && rowIndex <= subgridRowIndex + 2;
            const testCol = colIndex >= subgridColIndex && colIndex <= subgridColIndex + 2;

            return testRow && testCol
        }
        return false
    }

    function sameCol(selectedCell, colIndex) {
        if (selectedCell) {
            return selectedCell.colIndex === colIndex
        }
        return false
    }

    function isSameSetOfCell(selectedCell, rowIndex, colIndex) {
        return sameCol(selectedCell, colIndex) || sameSubGrid(selectedCell, rowIndex, colIndex) ? 'sameRowCol' : ''
    }

    function sameValue(selectedCell, val) {
        if (selectedCell) {
            return selectedCell.value === val
        }
        return false
    }

    return (
        <table ref={tableRef} tabIndex='0' className='sudokuTable'>
            <tbody>
                {sudokuArray.map((row, rowIndex) => (
                    <tr
                        key={nanoid()}
                        className={`${selectedCell && selectedCell.rowIndex === rowIndex ? 'sameRowCol' : ''}`}>
                        {row.map((value, colIndex) => (
                            typeof value === 'object' ?
                                <td
                                    key={nanoid()}
                                    role='gridcell'
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    className={`notesTd 
                                        ${isSameSetOfCell(selectedCell, rowIndex, colIndex)}
                                        
                                        ${isSelected(selectedCell, rowIndex, colIndex)}
                                        ${selectedCell && value.includes(selectedCell.value) ? 'sameValueNoteCell' : ''}`
                                    }
                                >
                                    <div className='notesGrid'>
                                        {value.map(num =>
                                            <div
                                                key={nanoid()}
                                                className={`
                                                    noteCell
                                                    ${sameValue(selectedCell, num) ? 'sameValueCell' : ''}`
                                                }
                                            >
                                                {num !== 0 ? num : ''}
                                            </div>)}
                                    </div>
                                </td> :
                                errorCell && errorCell.some((err) => err.rowIndex === rowIndex && err.colIndex === colIndex) ?
                                    <td
                                        key={nanoid()}
                                        role='gridcell'
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        className='cell errorCell'
                                    >
                                        {value}
                                    </td> :

                                    <td
                                        key={nanoid()}
                                        role='gridcell'
                                        onClick={() => handleCellClick(rowIndex, colIndex, value)}
                                        className={`
                                                cell
                                                ${isSameSetOfCell(selectedCell, rowIndex, colIndex)}

                                                ${isSelected(selectedCell, rowIndex, colIndex)}
                                                ${sameValue(selectedCell, value) ? 'sameValueNoteCell sameValueCell' : ''}`
                                        }
                                    >
                                        {value}
                                    </td>

                        ))}
                    </tr>
                ))}

            </tbody>
        </table>
    )
}


