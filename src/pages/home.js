import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FilledInput,
  Grid,
  Paper,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const Spinner = styled.div`
  position: absolute;
  top: 45%;
  left: 47%;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  border: 3px solid ${"palevioletred"};
  border-top-color: ${"pick"};
  animation: anim 0.7s infinite linear;

  @keyframes anim {
    to {
      transform: rotate(360deg);
    }
  }
`;

const initState = {
  title: "",
  description: "",
};

export default function Home() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(initState);
  const [normal, setNormal] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("../../api/normal")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNormal(data);

        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    e.persist();
    setDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  // 페이지 이동시 구현
  const handleSubmit = async () => {
    for (const field in details) {
      if (typeof details[field] === "string" && !details[field]) return;
    }
    setLoading(true);
    // history.push()
    setLoading(false);
  };

  const onChangeTitle = (title) => {
    setDetails({ ...details, title: title });
  };

  function FormRow(props) {
    return (
      <React.Fragment>
        <Grid item xs={1}>
          <div>
            <Tooltip title="해당 제목으로 변경합니다." placement="top-start">
              <Button
                variant="contained"
                color="secondary"
                style={{
                  fontFamily: "Chosunilbo_myungjo",
                  fontWeight: 600,
                  height: "63px",
                  width: "100%",
                  backgroundColor: "#00BFA5",
                }}
                onClick={() => onChangeTitle(props.title)}
              >
                선택
              </Button>
            </Tooltip>
          </div>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <p>{props.title}</p>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <p>{props.bleu}</p>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  console.log("normal", normal);

  console.log("details", details);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <h1>기사 제목 생성기 </h1>
          <Grid style={{ marginTop: "20px" }}>
            {/* <h4>기사 제목</h4> */}
            <Paper style={{ marginTop: "10px" }}>
              <FilledInput
                className={classes.nput}
                onChange={handleChange}
                name="title"
                value={details.title}
                ref={(input) => input && input.focus()}
                autoComplete="off"
                placeholder="Article Title *"
                disableUnderline
                fullWidth
                style={{ marginTop: "-15px", fontSize: "18px" }}
              />
            </Paper>

            <Container
              fullWidth
              style={{ marginTop: "15px", marginBottom: "15px" }}
            >
              <Grid container spacing={1}>
                {normal.map((x, i) => {
                  console.log(x);
                  return (
                    <Grid container item xs={12} spacing={1}>
                      <FormRow title={x["title"]} bleu={x["bleu"]} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>

            {/* <h4>기사 내용</h4> */}
            <Paper style={{ marginTop: "30px" }}>
              <FilledInput
                className={classes.nput}
                onChange={handleChange}
                name="description"
                value={details.description}
                autoComplete="off"
                placeholder="Article Description *"
                disableUnderline
                fullWidth
                multiline
                rows={14}
                style={{ marginTop: "-15px", fontSize: "18px" }}
              />
            </Paper>
          </Grid>

          {loading ? (
            <Spinner></Spinner>
          ) : (
            <Tooltip
              title="normal & popular 기사 제목 생성"
              placement="top-start"
            >
              <Button
                onClick={() => alert("제목 생성중!")}
                variant="contained"
                color="primary"
                style={{
                  marginTop: "5px",
                  width: "100px",
                  height: "50px",
                  fontFamily: "Chosunilbo_myungjo",
                  fontWeight: 600,
                  backgroundColor: "#00BFA5",
                }}
              >
                제목 생성
              </Button>
            </Tooltip>
          )}

          <Tooltip title="기사를 등록합니다." placement="top-start">
            <Button
              onClick={() => alert("Submit!")}
              variant="contained"
              color="primary"
              style={{
                marginTop: "5px",
                marginLeft: "10px",
                width: "100px",
                height: "50px",
                fontFamily: "Chosunilbo_myungjo",
                fontWeight: 600,
              }}
            >
              Post
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Chosunilbo_myungjo",
  },
  nput: {
    backgroundColor: "#E8EAF6",
    border: "1px solid black",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
    backgorundColor: "#F3E5F5",
    fontSize: "16px",
    fontWeight: 600,
  },
}));
