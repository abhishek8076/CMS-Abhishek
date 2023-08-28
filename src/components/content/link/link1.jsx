import React from 'react';
import {TextField} from  '@mui/material';

function AddLink() {
  const url = 'https://www.example.com';
  
  return (
    <div>
    <form>
          <TextField style={{"backgroundColor":"white"}}
          type='text'
            label="Enter URL"
            variant="outlined"
            // value={url}
            // onChange={handleUrlChange}
            fullWidth
            margin="normal"
            className="mb-3"
          />
       <div>
                <button type='submit' >Submit</button>
            </div>
            </form>
    </div>
  );
}

export default AddLink;

