import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@/application": __dirname + "/application",
  "@/domain": __dirname + "/domain",
  "@/infra": __dirname + "/infra",
});
