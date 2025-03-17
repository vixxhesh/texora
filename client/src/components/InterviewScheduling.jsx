import React, { useState } from "react";
import Layout from "./Layout";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": { backgroundColor: "#f0f0f0", color: "#333" },
    "& .MuiInputLabel-root": { color: "#333" },
  },
});

const ScheduleMeetingForm = () => {
  const [formData, setFormData] = useState({
    emails: [],
    topic: "",
    agenda: "",
    start_time: "",
    duration: "",
    timezone: "UTC+5:30",
    password: "",
    waiting_room: true,
    join_before_host: false,
    audio: "both",
    auto_recording: "cloud",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/zoom/create-meeting", formData);
      alert(`Meeting created! Join URL: ${response.data.meetingLink}`);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      alert("Failed to create meeting.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-[40vw] w-full space-y-8 bg-gray-800 p-8 rounded-xl">
          {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}> */}
          <h2 className="text-3xl font-bold text-white text-center">
            Interview Scheduling
          </h2>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2, // Adds spacing between all child elements
              }}
            >

                <TextField 
                    fullWidth
                    label="Email (comma-separated)"
                    name="emails"
                    value={formData.emails.join(", ")}
                    onChange={(e) => {
                        const emails = e.target.value.split(",").map((email) => email.trim());
                        setFormData({ ...formData, emails })
                    }}
                    required
                    InputProps={{
                        style: { color: "#ffffff" }, // Text color
                      }}
                      InputLabelProps={{
                        style: { color: "#cccccc" }, // Label color
                      }}
                />
              <TextField
                //   className="text-gray-300"
                label="Meeting Topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                fullWidth
                InputProps={{
                    style: { color: "#ffffff" }, // Text color
                  }}
                  InputLabelProps={{
                    style: { color: "#cccccc" }, // Label color
                  }}
              />
              <TextField
                label="Agenda"
                name="agenda"
                value={formData.agenda}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                InputProps={{
                    style: { color: "#ffffff" }, // Text color
                  }}
                  InputLabelProps={{
                    style: { color: "#cccccc" }, // Label color
                  }}
              />
              <TextField
                label="Start Time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                type="datetime-local"
                fullWidth
                InputProps={{
                    style: { color: "#ffffff" }, // Text color
                  }}
                  InputLabelProps={{
                    style: { color: "#cccccc" }, // Label color
                    shrink: true,
                  }}
              />
              <TextField
                label="Duration (Minutes)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                type="number"
                fullWidth
                InputProps={{
                    style: { color: "#ffffff" }, // Text color
                  }}
                  InputLabelProps={{
                    style: { color: "#cccccc" }, // Label color
                  }}
              />
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                InputProps={{
                    style: { color: "#ffffff" }, // Text color
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                  InputLabelProps={{
                    style: { color: "#cccccc" }, // Label color
                    shrink: true,
                  }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.waiting_room}
                    onChange={handleChange}
                    name="waiting_room"
                    sx={{
                        color: "#cccccc",
                        "&.Mui-checked": {
                          color: "#4caf50", // Checkbox checked color
                        },
                      }}
                  />
                }
                label={
                    <span style={{ color: "#cccccc" }}>Enable Waiting Room</span>
                  }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.join_before_host}
                    onChange={handleChange}
                    name="join_before_host"
                    sx={{
                        color: "#cccccc",
                        "&.Mui-checked": {
                          color: "#4caf50", // Checkbox checked color
                        },
                      }}
                  />
                }
                label={
                    <span style={{ color: "#cccccc" }}>Allow Join Before Host</span>
                  }
              />
              <Button type="submit" variant="contained" color="primary">
                Schedule Meeting
              </Button>
            </Box>
          </form>
          {/* </Box> */}
        </div>
      </div>
    </Layout>
  );
};

export default ScheduleMeetingForm;
