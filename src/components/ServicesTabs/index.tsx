import { type FC, type HTMLAttributes } from "react";
import { getCollection } from "astro:content";
import { Tab, TabPanel, Tabs, TabsList } from "@mui/base";
import css from "./style.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const services = await getCollection("services");

const ServiceTabs: FC<Props> = ({ className, ...props }) => {
  return (
    <Tabs
      defaultValue={services.find((el) => el.data.order === 1)?.slug}
      className={css.root}
    >
      <TabsList className={css.nav}>
        {services.map(({ data: { title, order }, slug }) => (
          <Tab style={{ order }} value={slug} className={css.link}>
            {title}
          </Tab>
        ))}
      </TabsList>
      {services.map(({ body, slug }) => (
        <TabPanel value={slug} className={css.preview}>
          {body}
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default ServiceTabs;
