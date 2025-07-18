import {useState} from 'react';
import {type SortOrder} from '../../utils/sortUtils';
import {ColumnResizer} from './ColumnResizer';
import styles from './TableHeader.module.css';

interface HeaderProps {
  sortKey: string | null;
  sortOrder: SortOrder;
  onSort: (key: string) => void;
}

const initialColumns = [
  {key: 'lastName', label: 'Last Name', width: 120},
  {key: 'firstName', label: 'First Name', width: 120},
  {key: 'maidenName', label: 'Maiden Name', width: 120},
  {key: 'age', label: 'Age', width: 80},
  {key: 'gender', label: 'Gender', width: 60},
  {key: 'phone', label: 'Phone', width: 150},
  {key: 'email', label: 'Email', width: 200},
  {key: 'country', label: 'Country', width: 120},
  {key: 'city', label: 'City', width: 120},
];

export const TableHeader: React.FC<HeaderProps> = ({
  sortKey,
  sortOrder,
  onSort,
}) => {
  const [columnWidths, setColumnWidths] = useState(
    initialColumns.reduce(
      (acc, col) => ({...acc, [col.key]: col.width}),
      {} as Record<string, number>,
    ),
  );

  const getSortSymbol = (key: string) => {
    if (sortKey !== key) return '';
    if (sortOrder === 'asc') return ' ▲';
    if (sortOrder === 'desc') return ' ▼';
    return '';
  };

  const handleColumnResize = (columnKey: string, newWidth: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [columnKey]: newWidth,
    }));
  };

  const handleHeaderClick = (key: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.column-resizer')) return;

    onSort(key);
  };

  return (
    <thead>
      <tr>
        {initialColumns.map((col) => (
          <th
            key={col.key}
            onClick={(e) => handleHeaderClick(col.key, e)}
            className={styles.tableHeader}
            style={{
              width: `${columnWidths[col.key]}px`,
            }}
          >
            <div className={styles.headerContent}>
              <span>
                {col.label}
                {getSortSymbol(col.key)}
              </span>
            </div>

            <div className={styles.columnResizer}>
              <ColumnResizer
                onResize={(width) => handleColumnResize(col.key, width)}
                minWidth={50}
              />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
