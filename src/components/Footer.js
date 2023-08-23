import "./Footer.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';
import moment from "moment-timezone";


function Footer({ utcOffset, setUtcOffset }) {
  const offsets = Array.from({length: 27}, (x, i) => i - 12)

  const handleChange = (event) => {
    setUtcOffset(event.target.value);
  };

  return(
    <div className="Footer">
      <div className="Dropdown">
        <FormControl size="small">
          <InputLabel className="Label"
            id="timezome-select"
          >
          </InputLabel>
          <Select
            labelId="timezone-select"
            id="timezone"
            value={utcOffset}
            onChange={handleChange}
            MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
          >
            {
              offsets.map((offset, i) => (
                <MenuItem 
                  dense={true}
                  value={offset}
                  key={i}
                >
                  {"UTC" + (offset >= 0 ? "+" + offset : offset)}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Footer;