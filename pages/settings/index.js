import Nav from "../../shared/components/Nav"
import SettingsItem from "../../shared/components/SettingsItem/SettingsItem"

export default function Settings () {
    return (
        <div className="container">
            <Nav showHomeLink={ true } />
            <h1>
                settings
            </h1>

            <SettingsItem text="import bookmarks" link="/settings/import-bookmarks" />
        </div>
   );
}