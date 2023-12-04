import React from "react";
import {
  Grid,
  TextField,
  Autocomplete,
  Button,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import {
  SQ,
  AGE,
  EMPLOYMENT_STATUS,
  EDUCATIONAL_STATUS,
  MARITAL_STATUS,
  SEX,
  RESIDENTIAL_STATUS,
  MOOD,
  RACE,
} from "../../utils/helpers/common";

import { useDispatch, useSelector } from "react-redux";
import { categoryDrillDownDataActions } from "../../slices/dashboard";

const SelectOption = ({
  options,
  onChange,
  renderOption,
  getOptionLabel,
  width = 200,
  value,
  multiple = false,
  filterSelectedOptions = false,
  label = "Choose an option",
}) => {
  return (
    <Autocomplete
      multiple={multiple}
      filterSelectedOptions={filterSelectedOptions}
      id="country-select-demo"
      sx={{
        display: "inline-block",
        width,
        verticalAlign: "middle",
      }}
      options={options}
      autoHighlight
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      value={value}
      onChange={onChange}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            // autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

const MyForm = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.categoryDrillDown);

  console.log(profile, "profile");

  const valueDispatch = (value) => {
    dispatch(categoryDrillDownDataActions.setState(value));
  };

  return (
    <Grid container spacing={2} width={"100%"} height={"100%"}>
      {/* Left side (Dropdown) */}
      <Grid
        item
        xs={12}
        md={6}
        // padding={2}
        // sx={{ backgroundColor: "white", boxShadow: 5, borderRadius: 1 }}
      >
        <Grid
          margin={2}
          sx={{ backgroundColor: "white", boxShadow: 5, borderRadius: 1 }}
          width={"100%"}
          minHeight={"80vh"}
        >
          <Grid padding={1} display={"flex"} justifyContent={"center"}>
            <Typography variant="h5">User Profile</Typography>
          </Grid>
          <Grid padding={1}>
            I am
            <TextField
              label="Enter text"
              value={profile.name}
              onChange={(e) =>
                valueDispatch({ key: "name", value: e.target.value })
              }
              size="small"
            />
          </Grid>
          <Grid padding={1}>
            I live in{" "}
            <SelectOption
              options={SQ}
              onChange={(_1, value) =>
                valueDispatch({ key: "location", value })
              }
              renderOption={(props, option) => <div {...props}>{option}</div>}
              width={400}
              getOptionLabel={(option) => option}
              value={profile.location}
            />
          </Grid>
          <Grid padding={1}>
            My Age is{" "}
            <SelectOption
              options={AGE}
              onChange={(_1, value) => valueDispatch({ key: "age", value })}
              renderOption={(props, option) => <div {...props}>{option}</div>}
              width={400}
              getOptionLabel={(option) => option}
              value={profile.age}
            />
          </Grid>
          <Grid padding={1}>
            My Educational status is{" "}
            <SelectOption
              options={EDUCATIONAL_STATUS}
              onChange={(_1, value) =>
                valueDispatch({ key: "educationalStatus", value })
              }
              renderOption={(props, option) => <div {...props}>{option}</div>}
              width={400}
              getOptionLabel={(option) => option}
              value={profile.educationalStatus}
            />
          </Grid>
          <Grid padding={1}>
            My marital status is{" "}
            <SelectOption
              options={MARITAL_STATUS}
              onChange={(_1, value) =>
                valueDispatch({ key: "maritalStatus", value })
              }
              renderOption={(props, option) => <div {...props}>{option}</div>}
              width={400}
              getOptionLabel={(option) => option}
              value={profile.maritalStatus}
            />
          </Grid>
          <Grid padding={1}>
            My Residential Status is{" "}
            <SelectOption
              options={RESIDENTIAL_STATUS}
              onChange={(_1, value) =>
                valueDispatch({ key: "residence", value })
              }
              renderOption={(props, option) => <div {...props}>{option}</div>}
              width={400}
              getOptionLabel={(option) => option}
              value={profile.residence}
            />
          </Grid>
          <Grid padding={1}>
            My Employment Status is{" "}
            <SelectOption
              options={EMPLOYMENT_STATUS}
              onChange={(_1, value) =>
                valueDispatch({ key: "employmentStatus", value })
              }
              renderOption={(props, option) => <div {...props}>{option}</div>}
              width={400}
              getOptionLabel={(option) => option}
              value={profile.employmentStatus}
            />
          </Grid>
          <Grid padding={1}>
            Some of the emotions i exihibit the most
            <SelectOption
              multiple={true}
              filterSelectedOptions={true}
              options={MOOD}
              onChange={(_1, value) =>
                valueDispatch({ key: "emotions", value })
              }
              renderOption={(props, option) => <div {...props}>{option}</div>}
              width={400}
              getOptionLabel={(option) => option}
              value={profile.emotions}
            />
          </Grid>
          <Grid padding={1}>
            Sex:
            <SelectOption
              options={SEX}
              onChange={(_1, value) => valueDispatch({ key: "sex", value })}
              renderOption={(props, option) => <div {...props}>{option}</div>}
              width={400}
              getOptionLabel={(option) => option}
              value={profile.sex}
            />
          </Grid>
          <Grid padding={1}>
            Race:
            <SelectOption
              options={RACE}
              onChange={(_1, value) => valueDispatch({ key: "race", value })}
              renderOption={(props, option) => <div {...props}>{option}</div>}
              width={400}
              getOptionLabel={(option) => option}
              value={profile.race}
            />
          </Grid>
          <Grid padding={1}>
            Attributes:
            <TextField
              label="Enter Preferences"
              value={profile.preferences}
              size="small"
              style={{ width: "80%", marginRight: 10 }}
              onChange={(e) =>
                valueDispatch({ key: "preferences", value: e.target.value })
              }
            />
          </Grid>

          <Grid padding={1} display={"flex"} justifyContent={"right"}>
            <Button
              variant="contained"
              disabled={profile.sugg}
              color="error"
              onClick={() => {
                const np = {
                  ...profile
                };
                delete np.sugg;
                delete np.feedbackPrompts;
                dispatch(
                  categoryDrillDownDataActions.fetchSuggestions({ profile:np })
                );
              }}
            >
              Diagonise
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid
          margin={2}
          sx={{ backgroundColor: "white", boxShadow: 5, borderRadius: 1 }}
          width={"100%"}
          minHeight={"80vh"}
        >
          {/* <Grid padding={1}>
            Response:
            <TextareaAutosize
              style={{
                width: "100%",
              }}
              disabled
              label="Response"
              value={
                profile.sugg?.diag || ""
                // "Your estimated diagnosis, based on the input you provided, is Trauma- and stressor-related disorders."
              }
            />
          </Grid> */}

          {/* <Grid padding={1}>
                        <Button
              variant="contained"
              color="info"
              onClick={() => {
                // console.log()
                // valueDispatch({ key: "feedbackPrompts", value:[...profile.feedbackPrompts, 
                //   {
                //     "role": "user", "content" : profile.feedback
                // },{
                //   "role": "assistant", "content": profile.sugg?.suggestions,
  
                // }
                // ] })
                // dispatch(
                //   categoryDrillDownDataActions.fetchFeedback({api_response: profile.sugg?.suggestions, feedback: profile.feedback, diag: profile.sugg?.diag,feedbackPrompts:profile.feedbackPrompts
                // })
                // );
               
              }}
            >
              Feedback
            </Button>
            (Note: The feedback will be added as a prefernce for your future
            promts and will optimize the search results)
          </Grid> */}

          <Grid padding={1}>
            Suggestions:
            <TextareaAutosize
              style={{
                width: "100%",
              }}
              disabled
              label="Response"
              value={profile.sugg?.suggestions || ""}
              // value={`Trauma- and stressor-related disorders are a category of mental health disorders that are triggered by the experience of a traumatic life event or a series of stressful situations. Based on the input you provided, it seems that you have been experiencing ongoing stress and underlying trauma.

              //   So it is recommended to consult with a qualified mental health provider for a proper diagnosis and treatment plan. However, I can provide some general recommendations and insights based on the information you shared.

              //   1. Seek professional help: Consider reaching out to a mental health professional such as a therapist or psychiatrist who can conduct a thorough assessment and provide appropriate treatment options. They may suggest therapy techniques like Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and Reprocessing (EMDR), or medication if necessary.

              //   2. Practice self-care and stress management: Engage in activities that promote relaxation and self-care such as exercise, meditation, deep breathing exercises, or hobbies that you enjoy. These activities can help reduce stress and promote overall well-being.

              //   3. Build a strong support system: Surround yourself with supportive and understanding individuals who can provide a listening ear and offer emotional support. You may also consider joining support groups or online communities where you can connect with others who have had similar experiences.

              //   4. Create a safe environment: Identify triggers that exacerbate your stress and trauma symptoms, and take steps to create a safe and soothing environment for yourself. This might include setting boundaries, avoiding triggering situations or people, and implementing relaxation techniques when you feel overwhelmed.

              //   5. Educate yourself on trauma and stress management: Learning about trauma responses and coping mechanisms can be empowering. There are various resources available such as books, online articles, and podcasts that can provide valuable insights and strategies for managing trauma and stress.
              //   `}
            />
          </Grid>

          <Grid padding={1}>
            {/* Feedback:  */}
            <TextField
              label="Enter Feedback"
              value={profile.feedback}
              size="small"
              style={{ width: "80%", marginRight: 10 }}
              onChange={(e, value) =>
                // {
                //   console.log(e.target.value)
                // }
                valueDispatch({ key: "feedback", value: e.target.value })
              }
            />
            <Button
              variant="contained"
              color="info"
              onClick={() => {
               
                const np = {
                  ...profile
                };
                delete np.sugg;
                delete np.feedbackPrompts;
                dispatch(
                  categoryDrillDownDataActions.fetchFeedback({
                    profile: np,
                    feedback: [
                      ...profile.feedbackPrompts,
                      profile.feedback
                     ].join(','),
                    diag: profile.sugg?.diag,
                    // feedbackPrompts: profile.feedbackPrompts,
                  })
                );
                valueDispatch({
                  key: "feedbackPrompts",
                  value: [
                   ...profile.feedbackPrompts,
                   profile.feedback
                  ],
                });
              }}
            >
              Feedback
            </Button>
            (Any suggestion that does not suit you or that needs to be addressed)
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyForm;
