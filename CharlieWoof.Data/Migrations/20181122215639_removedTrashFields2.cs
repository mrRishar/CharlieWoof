using Microsoft.EntityFrameworkCore.Migrations;

namespace CharlieWoof.Data.Migrations
{
    public partial class removedTrashFields2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "MagicPages");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "HistoricalMagicPages",
                newName: "SeoKeywords");

            migrationBuilder.AddColumn<string>(
                name: "SeoKeywords",
                table: "MagicPages",
                maxLength: 250,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SeoKeywords",
                table: "MagicPages");

            migrationBuilder.RenameColumn(
                name: "SeoKeywords",
                table: "HistoricalMagicPages",
                newName: "Url");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "MagicPages",
                maxLength: 500,
                nullable: false,
                defaultValue: "");
        }
    }
}
