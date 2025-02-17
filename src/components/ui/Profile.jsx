import React, { useState, useEffect } from "react";
import { Card, CardContent, Avatar, Typography, IconButton, Stack, CircularProgress, Button, Chip, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import UpdateProfile from "./UpdateProfile";
import Unavbar from "../navbar/Unavbar";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [jobseekerData, setJobseekerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEditClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const token = sessionStorage.getItem('logintoken');
    if (token) {
      axios
        .get("https://backend-deploy-w14v.onrender.com/api/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setJobseekerData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!jobseekerData) {
    return <div>No profile data found.</div>;
  }

  return (
    <div>
    <Unavbar/>
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "12%" }}>
      <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, width: 500, height: 300 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 50, height: 50 }} src={jobseekerData.profileImage || ""} />
              <div>
                <Typography variant="h6" fontWeight="bold">{jobseekerData.name || "Full Name"}</Typography>
                <Typography variant="body2" color="text.secondary">{jobseekerData.bio || "Bio"}</Typography>
              </div>
            </Stack>
            <IconButton onClick={handleEditClick}><EditIcon /></IconButton>
          </Stack>

          <Stack spacing={1} mt={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2">{jobseekerData.email || "email@gmail.com"}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2">{jobseekerData.mobileNumber || "123-456-7890"}</Typography>
            </Stack>
          </Stack>

          <Typography variant="subtitle1" fontWeight="bold" mt={2}>Skills</Typography>
          <Stack direction="row" spacing={1} mt={1}>
            {jobseekerData.skills?.map((skill, index) => (
              <Chip key={index} label={skill} />
            ))}
          </Stack>
          <Typography variant="subtitle1" fontWeight="bold" mt={2}>Resume: <a href={`${jobseekerData.resume}`}>
                      View
                      </a></Typography>
        </CardContent>
      </Card>

      <UpdateProfile open={open} onClose={handleClose} jobseekerData={jobseekerData} />
    </Box>
    </div>
  );
};

export default Profile;

