import Stack from "components/Stack";
import Paper from "components/Paper";
import CardContent from "components/CardContent";
import Typography from "components/Typography";
import CardTitle from "components/CardTitle";
import { formatDateTime } from "misc/utils/date";
import useLocationSearch from "misc/hooks/useLocationSearch";

export default function ReviewItem({ item }) {
  const { lang } = useLocationSearch();
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          padding: "10px",
        }}
      >
        <CardTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "100%",
            }}
          >
            <Typography>{item.author}</Typography>
            <Typography variant="caption">
              {formatDateTime(lang, item.createdAt)}
            </Typography>
          </Stack>
        </CardTitle>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Paper
              variant="outlined"
              sx={{
                padding: "5px",
                width: "max-content",
              }}
            >
              <CardContent>
                <Typography variant="subTitle">{item.rating}/5</Typography>
              </CardContent>
            </Paper>
            <Typography>{item.content}</Typography>
          </Stack>
        </CardContent>
      </Paper>
    </>
  );
}
