import React from 'react';
import './ChargerList.scss';
import Button from '../reusable/Button/Button';

type charger = {
  id: number;
  type: string;
  serialNumber: string;
  status: string;
  lastUpdated: string;
};

interface ChargerListProps {
  onEditPress(id:number): any;
  onDeletePress(id:number): any;
  onPopUpPress(value: boolean): any;
  btnDisable: boolean;
  chargers: Array<charger>;
}

const ChargerList: React.FunctionComponent<ChargerListProps> = ({
  onEditPress,
  onDeletePress,
  onPopUpPress,
  btnDisable,
  chargers,
}) => {
  const popUp = () => {
    onPopUpPress(true);
  };
  const onEdit = (id:number) => {
    onEditPress(id);
  };
  const onDelete = (id:number) => {
    onDeletePress(id);
  };
  return (
    <div className="add-charger-wrapper">
      <div className="wrapper-charger">
        <p className="table-title">Chargers</p>
        <button onClick={popUp} disabled={btnDisable} className="add-button">
          Add Charger
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Serial Number</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
            {chargers.length ?
              chargers.map((charger, key) => {
                // eslint-disable-next-line max-len
                const d = new Date(parseInt(charger.lastUpdated)).toISOString().substring(0, 19);
                return (
                  <tr key={key}>
                    <td>{charger.id}</td>
                    <td>{charger.type}</td>
                    <td>{charger.serialNumber}</td>
                    <td>
                      <div
                        className={`${
                          charger.status === 'CONNECTED' ?
                            'charger-status-active' :
                            'charger-status-disable'
                        }`}
                      >
                        {charger.status}
                      </div>
                    </td>
                    <td>{d}</td>
                    <td className="action-row">
                      <Button value="Edit" onPress={() => onEdit(charger.id)} />
                      <Button
                        value="Delete"
                        onPress={() => onDelete(charger.id)}
                      />
                    </td>
                  </tr>
                );
              }) :
              null}
          </tbody>
        </table>
        {chargers.length === 0 && (
          <p className="empty-charger-text">
            No charger has been added to this location yet
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(ChargerList);
