using Microsoft.EntityFrameworkCore.Migrations;

namespace CharlieWoof.Data.Migrations
{
    public partial class addSortNumber_to_MagicPages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SortNumder",
                table: "MagicPages",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SortNumder",
                table: "MagicPages");
        }
    }
}
