import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/styles/theme";
import {
  PartnerRegistrationFormStatus,
  PartnerRegistrationFormStatusTrans,
} from "@/types/partner";
import { border } from "@/styles/border";
import { WithdrawStatus } from "@/types/withdraw";

type FoodOrderStatusBadgeProps = {
  status: PartnerRegistrationFormStatus | WithdrawStatus;
};

const StatusTrans = { ...PartnerRegistrationFormStatusTrans };

export const StatusBadge = ({ status }: FoodOrderStatusBadgeProps) => {
  return (
    <RowView
      style={[
        { ...border(1, colors.darkGrey) },
        styles[status],
        styles.container,
      ]}
    >
      <Typography
        size12
        lineHeight={14}
        bold
        style={[{ color: colors.darkGrey }, fontStyles[status]]}
      >
        {StatusTrans[status]}
      </Typography>
    </RowView>
  );
};

const fontStyles = StyleSheet.create({
  [PartnerRegistrationFormStatus.Reject]: {
    color: colors.error,
  },
  [PartnerRegistrationFormStatus.Approve]: {
    color: colors.primary,
  },
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  [PartnerRegistrationFormStatus.Reject]: {
    borderWidth: 0,
    backgroundColor: "#FFEFEC",
  },
  [PartnerRegistrationFormStatus.Approve]: {
    borderWidth: 0,
    backgroundColor: "rgba(223, 255, 224, 1)",
  },
});
