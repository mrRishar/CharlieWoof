using Microsoft.EntityFrameworkCore.Migrations;

namespace CharlieWoof.Data.Migrations
{
    public partial class AddUpdation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "EmagicFileType",
                table: "MagicFiles",
                nullable: false,
                defaultValue: (byte)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmagicFileType",
                table: "MagicFiles");
        }
    }
}
