import {useState} from 'react';
import type {FilterValues} from '../../types/filters';
import styles from './Filters.module.css';

interface Props {
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
  onClearFilters: () => void;
}

export const Filters: React.FC<Props> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (field: keyof FilterValues, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value.trim() !== '',
  );

  return (
    <div className={styles.filtersContainer}>
      <div
        className={
          isExpanded ? styles.filtersHeader : styles.filtersHeaderCollapsed
        }
      >
        <h3 className={styles.filtersTitle}>Filters</h3>
        <div className={styles.buttonGroup}>
          {hasActiveFilters && (
            <button onClick={onClearFilters} className={styles.clearButton}>
              Clear
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.toggleButton}
          >
            {isExpanded ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.filtersGrid}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>First Name:</label>
            <input
              type="text"
              value={filters.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={styles.filterInput}
              placeholder="Filter by first name"
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Last Name:</label>
            <input
              type="text"
              value={filters.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={styles.filterInput}
              placeholder="Filter by last name"
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Age:</label>
            <input
              type="number"
              value={filters.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className={styles.filterInput}
              placeholder="Age"
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Gender:</label>
            <select
              value={filters.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Phone:</label>
            <input
              type="text"
              value={filters.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={styles.filterInput}
              placeholder="Filter by phone"
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Email:</label>
            <input
              type="text"
              value={filters.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={styles.filterInput}
              placeholder="Filter by email"
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Country:</label>
            <input
              type="text"
              value={filters.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={styles.filterInput}
              placeholder="Filter by country"
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>City:</label>
            <input
              type="text"
              value={filters.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={styles.filterInput}
              placeholder="Filter by city"
            />
          </div>
        </div>
      )}
    </div>
  );
};
