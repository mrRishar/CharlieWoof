using Microsoft.EntityFrameworkCore.Migrations;

namespace CharlieWoof.Data.Migrations
{
    public partial class RenameFeedback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Feedback",
                table: "Users",
                newName: "Note");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Orders",
                newName: "Date");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Note",
                table: "Users",
                newName: "Feedback");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Orders",
                newName: "Data");
        }
    }
}
